import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as docx from "docx";
import { saveAs } from "file-saver";
import { HeadingLevel, AlignmentType, UnderlineType } from "docx";
import { element } from 'prop-types';
import { create } from '@mui/material/styles/createTransitions';

function DocumentGenerator(props) {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Document Generator');

  useEffect(() => {
    console.log(`in useEffect`);
    createDocumentArray();
  }, []);

  let testData = [
    {
      header: "First Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Second Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Third Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
  ]

  const [documentArray, setDocumentArray] = useState([]);
  // 1 = header; 2 = paragraph;

  const createDocumentArray = () => {
    for (let i = 0; i < testData.length; i++) {
      documentArray.push(1);
      documentArray.push(testData[i].header);
      for (let j = 0; j < testData[i].paragraphs.length; j++) {
        documentArray.push(2);
        documentArray.push(testData[i].paragraphs[j]);
      }
    }
  }

  const createChildrenArray = (array) => {
    console.log('in createHeadersAndParagraphs');
    for (let i = 0; i < documentArray.length; i++) {
      if (documentArray[i] === 1) {
        childrenArray.push(createHeader(documentArray[i + 1]));
      }
      else if (documentArray[i] === 2) {
        childrenArray.push(createParagraph(documentArray[i + 1]));
      }
      else {
        console.log('not important')
      }
    }
  }

  const createHeader = (element) => {
    return new docx.Paragraph({
      text: element,
      style: HeadingLevel.HEADING_2
    })
  }

  const createParagraph = (element) => {
    return new docx.Paragraph({
      text: element,
      style: "normalPara",
    })
  }

  const [childrenArray, setChildrenArray] = useState([
    new docx.Paragraph({
      text: "Travel Policy",
      heading: HeadingLevel.HEADING_1,
    }),
  ]);

  const generate = () => {
    const doc = new docx.Document({
      styles: {
        // font size needs to be set as double the goal size.
        default: {
          heading1: {
            run: {
              size: 40,
              bold: true,
              color: "000000",
            }
          },
          heading2: {
            run: {
              size: 32,
              bold: false,
              color: "000000",
              underline: {},
            },
            paragraph: {
              alignment: AlignmentType.RIGHT,
            }
          }
        },
        paragraphStyles: [
          {
            id: "normalPara",
            name: "Normal Para",
            basedOn: "Normal",
            next: "Normal",
            run: {
              size: 28,
            },
            paragraph: {
            }
          }
        ]
      },
      sections: [
        {
          properties: {},
          children:
            childrenArray
        }
      ]
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }

  return (
    <div>
      <h2>{heading}</h2>
      <button onClick={() => console.log('documentArray:', documentArray)}>console.log documentArray</button>
      <button onClick={() => createChildrenArray(...documentArray)}>create childrenArray</button>
      <button onClick={() => console.log('childrenArray:', childrenArray)}>console.log childrenArray</button>
      <button onClick={() => generate()}>generate document</button>
    </div>
  );
}

export default DocumentGenerator;
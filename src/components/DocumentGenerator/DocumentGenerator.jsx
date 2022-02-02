import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as docx from "docx";
import { saveAs } from "file-saver";
import { HeadingLevel, AlignmentType, UnderlineType } from "docx";

function DocumentGenerator(props) {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

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
            [
              new docx.Paragraph({
                text: "Travel Policy",
                heading: HeadingLevel.HEADING_1,
                // alignment: AlignmentType.CENTER,
              }),
              new docx.Paragraph({
                text: "First Header",
                heading: HeadingLevel.HEADING_2,
                // alignment: AlignmentType.RIGHT,
              }),
              new docx.Paragraph({
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.",
                style: "normalPara",
              }),
            ]
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
      <button onClick={generate()}>generate document</button>
    </div>
  );
}

export default DocumentGenerator;

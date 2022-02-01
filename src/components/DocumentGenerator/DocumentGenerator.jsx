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
      sections: [
        {
          properties: {},
          children:
            [
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "Travel Policy",
                    bold: true,
                  })
                ]
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "First Header",
                    underline: {},
                  })
                ],
                alignment: AlignmentType.RIGHT,
              }),
              new docx.Paragraph({
                children: [
                  new docx.TextRun({
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.",
                  }),
                ]
              }),
              // new docx.Paragraph({
              //   children: [
              //     new docx.TextRun("Hello World"),
              //     new docx.TextRun({
              //       text: "Foo Bar",
              //       bold: true
              //     }),
              //     new docx.TextRun({
              //       text: "\tGithub is the best",
              //       bold: true
              //     })
              //   ]
              // })
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

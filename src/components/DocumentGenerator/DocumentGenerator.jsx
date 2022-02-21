import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DocumentGenerator.css';
import * as docx from "docx";
import { saveAs } from "file-saver";
import { HeadingLevel, AlignmentType, convertInchesToTwip, LevelFormat, NumberProperties, Indent, Numbering, PageNumber } from "docx";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

function DocumentGenerator(props) {
  const documentData = useSelector((store) => store.documentReducer);//added for data to make document
  const saveButton = useSelector(store => store.showSaveReducer);
  const [heading, setHeading] = useState('Document Generator');
  const companyName = useSelector((store) => store.user.company_name);

  const dispatch = useDispatch();

  // const [saveToggle, setSaveButton] = useState(false);

  useEffect(() => {
    console.log(`in useEffect`);
    console.log("documentData:", documentData);
    console.log("companyName:", companyName);
    createDocumentArray();
    createChildrenArray();
    dispatch({
      type: 'SET_SAVE',
      payload: saveToggle
    });
  }, []);


  const [saveToggle, setSaveButton] = useState(false);

  let testCompanyName = "Company, Inc.";

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
    {
      header: "Fourth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Fifth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Sixth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    }, {
      header: "Seventh Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Eighth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Ninth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Tenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Eleventh Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Twelfth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Thirteenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Fourteenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Fifteenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Sixteenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Seventeenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
    {
      header: "Eighteenth Header",
      paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.",]
    },
  ]

  let demoData = [
    {
      header: "Purpose",
      Paragraphs: ["This policy governs the principles under which Pete, Inc. employees must travel, conduct meetings and expense, and incur business expenses and claim reimbursements. In addition to providing rules, it highlights which practices keep the traveler the most safe, ways to find savings, how to improve experience on trip, and how to be more sustainable.", "To help reduce the environmental impact of our travel, travel on Pete, Inc. company business must only occur when it adds significant value, that cannot be accomplished through means such as phone or video conferencing (e.g. Zoom, Webex).", "This policy applies to all Pete, Inc. employees, globally, for travel undertaken by employees away from their office location or normal place of work. Violators may be subject to disciplinary action, up to and including termination of employment.", "When booking a trip with the Travel Agency or Online Booking Tool (OBT), you may be asked for your purpose of trip, and then the reason for you selecting the airline and hotels you have selected. Please answer as suitably as possible, as doing so helps improve the offerings that Pete, Inc. can offer Team Members who travel.", "To help reduce the environmental impact of our travel, we encourage team members to combine trips and do multiple meetings in a destination, or to travel from one destination directly to the next."]
    },
    {
      header: "Booking/TMC",
      Paragraphs: ["All travel bookings (airline, hotel, car rental etc) must be made through the approved online booking tool (OBT) or the designated Employee Travel Office agency [TMC name to be provided by end user here]. Fees associated with booking travel through these channels may be expensed. The use of any provider, including booking direct with the provider (airline, hotel, car rental etc.) is strictly prohibited, and will not be reimbursed for expenses.", "You must use the online booking tool (OBT) for point–to-point journeys or contact the travel agency for multi-stop complex journeys (e.g. A to B to C to A).", "When booking a trip with the Travel Agency or Online Booking Tool (OBT), you must book your air ticket, hotel stay, plus any relevant ground transport in a single transaction.", "Should there be a need to rebook, Team Members must notify Global Travel as soon as possible to avoid fees that may occur closer to the time of travel.", "Team Members must notify the Global Travel Team as soon as possible if they need to cancel their travel. The unused air ticket will be applied to the Team Member’s next flight or otherwise used in the most cost-effective manner. If tickets have not been rebooked within 30 days of the ticket expiring, the credit will be used at the discretion of the company.", "Documented pre-approval is required for travel, otherwise, the expense will be considered non-reimbursable. All business trips must to be approved by your supervisor or cost centre owner before any booking is completed. Booking via our online booking tool (OBT) or the travel agency will notify the relevant contact on your behalf."]
    },
    {
      header: "Payment",
      Paragraphs: ["The Corporate Card is the mandated method of payment for all Pete, Inc. business-related travel and expenses for those who travel regularly. Staff employees who incur regular business related expenses may apply for the Corporate Card. Approval is required from your manager and your local Finance lead before obtaining a card.", "Using personal cards instead of a corporate card will result in it not being reimbursable.", "Pete, Inc. utilizes virtual card payments and central payments. On your travel booking, ensure you understand how payment is being made to avoid accidental overpay.", "All travelers should submit their reimbursement request within 7 days of travel, or on a post trip basis; reimbursement requests over 60 days will not be approved."]
    },
    {
      header: "Inconvenient Travel",
      Paragraphs: ["Expenses incurred by spouses, partners or dependents of employees, for care due to notification of corporate travel within 48 hours are considered reimbursable.", "At supervisors discretion, where a team member works late on site, they may expense a private taxi home if past 10pm.", "At supervisors discretion, where a team member works on a public or company holiday (outside of their normal work schedule) they may expense a taxi to and from the point of work.", "At supervisors discretion, where a team member works on a weekend (and outside of their normal work schedule) they may expense a taxi to and from the point of work."]
    },
    {
      header: "Loyalty Programs",
      Paragraphs: ["Selection of provider (for air, hotel, car rental etc) based on frequent user programs is allowed where it falls within a reasonable price window. Employees may retain the benefits from the rewards programs for personal use. However, any reasonable membership fees associated with these programs in reimbursable."]
    },
    {
      header: "Air",
      Paragraphs: ["Where possible and practical, we ask Team Members book travel as early as possible, to take advantage of lower. By booking further in advance helps drives cost savings for Pete, Inc., with an average of 20% savings booking more than two weeks ahead.", "Baggage fees that are reasonable and appropriate for the purpose and length of the trip are reimbursable. Check with the airline prior to departure for baggage size and weight restrictions. Pete, Inc. does not cover the loss of personal items. If a Team Member’s luggage is lost, basic necessities will be reimbursed as an exception.", "At supervisors discretion, payments for seat selection of “premium seating” (i.e., seating with extra legroom) are not reimbursable.", "Team Members who are pre-certified by HR may fly in seats with more legroom or a higher cabin based on a physician approved health condition or disability. For example, a recent surgery prohibits use of coach class service. Requests for such certification must be approved by HR and submitted to Global Travel before a flight can be booked.", "Redeye flights can be booked business class, though you should also consider whether it is possible to travel at a different time to reduce costs of travel.", "Mid-haul flights (5 hours +), where travel is overnight and where you are starting work immediately after the journey, should be booked business class, though you should also consider whether it is possible to travel at a different time to reduce costs of travel.", "Flights with single engine piston aircraft should not be booked without clearance from Pete, Inc. Security. In addition, aircraft of any type cannot be piloted for the purposes of corporate travel.", "Where possible and practical, no more than 50% of a team can be on a single flight for safety precautions.", "Team Members should only consider accepting flights with connections when the cost is $300 lower or greater, and where their travel schedules allow.", "On some routes, Pete, Inc. looks to ensure that trips do not exceed a set amount. The Travel Agency and Online Booking Tool will notify you when the threshold has been exceeded. In that situation, where possible please book your trip for different dates, or seek supervisor approval to book above the route cap threshold if travel is required for that time.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Hotel",
      Paragraphs: ["47D Placeholder Answer - Advanced purchase - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "48D Placeholder Answer - Preferred Supplier - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "49D Placeholder Answer - Room type/category - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "50D Placeholder Answer - Extended stay (> 7 days) - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "51D Placeholder Answer - Motels / 2 door policy - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "52D Placeholder Answer - Airbnb & shared accommodations - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "53D Placeholder Answer - Lowest logical - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "54D Placeholder Answer - City cap - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "55D Placeholder Answer - Double occupancy - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "56D Placeholder Answer - Tips - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]
    },
    {
      header: "Rail",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Car Rental",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Ground",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Leisure + Vacation",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Sustainablity",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Visas + Passports",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Per Diems + Expenses",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
    {
      header: "Ground",
      Paragraphs: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, veniam eos? Hic ea esse consequuntur aspernatur sint repudiandae quam fugiat dolores repellendus labore autem eius libero suscipit eveniet, nam tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tenetur omnis placeat eveniet animi optio vitae, quae mollitia fuga quos excepturi saepe aliquam, dolorem vel? Dolore blanditiis magni aliquid hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ex. Velit, eum sed. Asperiores velit quis accusantium temporibus, est molestiae ipsam earum. Hic, eaque quaerat ab veritatis ipsa est architecto."]
    },
  ]

  const [documentArray, setDocumentArray] = useState([]);
  // 1 = header; 2 = paragraph;
  // array of all strings with these identifiers before each

  const createDocumentArray = () => {
    // change demoData to documentData
    console.log('in createDocumentArray')
    for (let i = 0; i < demoData.length; i++) {
      documentArray.push(1);
      documentArray.push(demoData[i].header);
      for (let j = 0; j < demoData[i].Paragraphs.length; j++) {
        documentArray.push(2);
        documentArray.push(demoData[i].Paragraphs[j]);
      }
    }
  }

  // creates array of code snippets that the generate() function can read
  const createChildrenArray = (array) => {
    let num = 1;
    console.log('in createHeadersAndParagraphs');
    for (let i = 0; i < documentArray.length; i++) {
      let tableInfo = {
        number: num.toString(),
        text: documentArray[i + 1]
      }
      if (documentArray[i] === 1) {
        childrenArray.push(createHeader(documentArray[i + 1]));
        tableArray.push(createTableCode(tableInfo));
        num++;
      }
      else if (documentArray[i] === 2) {
        childrenArray.push(createParagraph(documentArray[i + 1]));
      }
      else {
        console.log('not important')
      }
    }
  }

  // creates code snippets for headers
  const createHeader = (element) => {
    return new docx.Paragraph({
      text: element,
      style: HeadingLevel.HEADING_2,
      numbering: {
        reference: "numbering-attempt",
        level: 0,
      }
    })
  }

  // creates code snippets for paragraphs
  const createParagraph = (element) => {
    return new docx.Paragraph({
      text: element,
      style: "normalPara",
      numbering: {
        reference: "numbering-attempt",
        level: 1,
      },
    })
  }

  // set up array with first, larger header component
  const [childrenArray, setChildrenArray] = useState([]);

  const createTableCode = (element) => {
    console.log('element:', element);
    return new docx.TableRow({
      children: [
        new docx.TableCell({
          children: [new docx.Paragraph({
            text: element.number,
          })]
        }),
        new docx.TableCell({
          children: [new docx.Paragraph({
            text: element.text,
          })]
        }),
      ]
    })
  }


  const [tableArray, setTableArray] = useState([
    new docx.TableRow({
      children: [
        new docx.TableCell({
          children: [new docx.Paragraph({
            text: "Section",
          })]
        }),
        new docx.TableCell({
          children: [new docx.Paragraph({
            text: "Topic",
          })]
        }),
      ]
    }),
  ])

  const generate = () => {
    const doc = new docx.Document({
      numbering: {
        config: [
          {
            reference: "numbering-attempt",
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: "%1",
                alignment: AlignmentType.START,
                style: {
                  run: {
                    underline: {},
                  },
                  paragraph: {
                    indent: { hanging: 300 },
                  }
                }
              },
              {
                level: 1,
                format: LevelFormat.DECIMAL,
                alignment: AlignmentType.END,
                text: "%1.%2",
                style: {
                  paragraph: {
                    indent: { left: 300, hanging: 600 }
                  }
                }
              }
            ]
          }
        ]
      },
      styles: {
        // font size needs to be set as double the goal size.
        default: {
          heading1: {
            run: {
              size: 40,
              bold: true,
              color: "000000",
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 420,
              }
            }
          },
          heading2: {
            run: {
              size: 32,
              bold: true,
              color: "000000",
              underline: {},
            },
            paragraph: {
              alignment: AlignmentType.START,
              spacing: {
                before: 240,
                after: 240,
              }
            }
          },
          heading3: {
            run: {
              size: 30,
              bold: false,
              color: "000000"
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
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
              size: 24,
            },
            paragraph: {
              indent: {
                left: convertInchesToTwip(0.5),
              },
              spacing: {
                before: 120,
                after: 120,
              }
            }
          },
        ]
      },
      sections: [
        {
          properties: {},
          footers: {
            default: new docx.Footer({
              children: [
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      children: [PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
                      style: "footer"
                    }),
                  ]
                })
              ]
            })
          },
          children:
            [
              new docx.Paragraph({
                text: companyName + " Travel Policy",
                heading: HeadingLevel.HEADING_1,
              }),
              new docx.Paragraph({
                text: "Table of Contents",
                heading: HeadingLevel.HEADING_3,
              }),
              new docx.Table({
                width: {
                  size: 9070,
                },
                columnWidths: [1000, 8070],
                // borders: {
                //   left: {
                //     color: "000000"
                //   },
                //   right: {
                //     color: "000000"
                //   }
                // },
                rows: tableArray
              }),
            ]
        },
        {
          properties: {},
          children: childrenArray
        }
      ]
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, companyName + " Travel Policy.docx");
      console.log("Document created successfully");
    });
  }

  return (
    <div className="body">
      <Card className="card">
        <h2 className="body">Your policy document is complete.</h2>
        <p className="body">
          <Button className="button" onClick={() => generate()}>Click here to download</Button>
        </p>
      </Card>
    </div>
  );
}

export default DocumentGenerator;
module.exports = ({
  name,
  interviwedDate,
  Jobspec,
  academicBackground,
  industryExperience,
  currentPosition,
  currentEmployer,
  interviwerName,
  approve,
  skill1,
  skill2,
  skill3,
  skill4,
  skill5,
  skill6,
  skill7,
  skill8,
  skill9,
  skill10,
  skill11,
  skill12,
  skill13,
  skill14,
  rate1,
  rate2,
  rate3,
  rate4,
  rate5,
  rate6,
  rate7,
  rate8,
  rate9,
  rate10,
  rate11,
  rate12,
  rate13,
  rate14,
  overrallRating,
  summary,
  salary1,
  salary2,
  salary3,
  salary4,
  period1,
  period2
}) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://pbs.twimg.com/profile_images/987193092145950720/qEQhRm98_400x400.jpg"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               Date interviewed : ${interviwedDate}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Candidate name: ${name}
                            </td>
                            <td>
                               Job specification: ${Jobspec}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td></td>
                   <td></td>
                </tr>
                <tr class="item">
                   <td>Acadamic background:</td>
                   <td>${academicBackground}</td>
                </tr>
                <tr class="item">
                   <td>Industry Experience :</td>
                   <td>${industryExperience}</td>
                </tr>

             <tr class="item">
             <td>Current position & period :</td>
             <td>${currentPosition}</td>
          </tr>

          <tr class="item">
          <td>Current Empolyer :</td>
          <td>${currentEmployer}</td>
       </tr>


          ${
            skill1
              ? ` <tr class="item"><td>${skill1} :</td><td>${rate1}</td></tr>`
              : ""
          }
 ${skill2 ? ` <tr class="item"><td>${skill2} :</td><td>${rate2}</td></tr>` : ""}

   ${
     skill3
       ? ` <tr class="item"><td>${skill3} :</td><td>${rate3}</td></tr>`
       : ""
   }

  ${
    skill4 ? ` <tr class="item"><td>${skill4} :</td><td>${rate4}</td></tr>` : ""
  }



          ${
            skill5
              ? ` <tr class="item"><td>${skill5} :</td><td>${rate5}</td></tr>`
              : ""
          }
 ${skill6 ? ` <tr class="item"><td>${skill6} :</td><td>${rate6}</td></tr>` : ""}

   ${
     skill7
       ? ` <tr class="item"><td>${skill7} :</td><td>${rate7}</td></tr>`
       : ""
   }

  ${
    skill8 ? ` <tr class="item"><td>${skill8} :</td><td>${rate8}</td></tr>` : ""
  }


 ${skill9 ? ` <tr class="item"><td>${skill9} :</td><td>${rate9}</td></tr>` : ""}
 ${
   skill10
     ? ` <tr class="item"><td>${skill10} :</td><td>${rate10}</td></tr>`
     : ""
 }
 ${
   skill11
     ? ` <tr class="item"><td>${skill11} :</td><td>${rate11}</td></tr>`
     : ""
 }
 ${
   skill12
     ? ` <tr class="item"><td>${skill12} :</td><td>${rate12}</td></tr>`
     : ""
 }
 ${
   skill13
     ? ` <tr class="item"><td>${skill13} :</td><td>${rate13}</td></tr>`
     : ""
 }

   ${
     skill14
       ? ` <tr class="item"><td>${skill14} :</td><td>${rate14}</td></tr>`
       : ""
   }
  
                <tr >
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                </tr>
                  <tr >
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                </tr>
                  <tr >
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                </tr>
                  <tr >
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                   <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
                </tr>


${summary ? ` <tr class="item"><td>Summary :</td><td>${summary}</td></tr>` : ""}

    ${
      overrallRating
        ? ` <tr class="item"><td>Overrall Rating :</td><td>${overrallRating}</td></tr>`
        : ""
    }


  ${
    salary1
      ? ` <tr class="item"><td> Salary Expected :</td><td>${salary1}</td></tr>`
      : ""
  }

     ${
       salary2
         ? ` <tr class="item"><td> Current  Salary  :</td><td>${salary2}</td></tr>`
         : ""
     }

     ${
       salary3
         ? ` <tr class="item"><td> Salary Band :</td><td>${salary3}</td></tr>`
         : ""
     }

  ${
    salary4
      ? ` <tr class="item"><td> Agreed Salary  :</td><td>${salary4}</td></tr>`
      : ""
  }
  ${
    period1
      ? ` <tr class="item"><td> Notice period :</td><td>${period1}</td></tr>`
      : ""
  }

      ${
        period2
          ? ` <tr class="item"><td> Starting date :</td><td>${period2}</td></tr>`
          : ""
      }
  

             </table>
             <br />
             <h3 class="justify-center">Interviwed by: ${interviwerName}</h3>
             
             <h3 class="justify-center">Approved by: ${approve}</h3>    
          </div>
       </body>
      <span style="margin-left: 10%;font-size: 10px " > Genarated via Recruitment Management System on ${new Date().toUTCString()} </span> 
    </html>
    `;
};

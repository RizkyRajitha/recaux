module.exports = ({
  out_Name,
  out_Designation,
  out_ExeProfile,
  Skill,
  Company,
  DesignationP,
  Duration,
  Environment,
  TechnologiesP,
  out_Qualification
}) => {
  const today = new Date();
  return `

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PDF Result Template</title>
    <style>
      .invoice-box {
      max-width 800px;
      margin: auto;
      padding: 30px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      font-size: 12px;
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
      padding-bottom: 14px;
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
      padding-bottom: 14px;
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
                <td class="title">
                  <img
                    src="https://pbs.twimg.com/profile_images/987193092145950720/qEQhRm98_400x400.jpg"
                    style="width:100%; max-width:156px;"
                  />
                </td>

               
              </tr>
            </table>

            <h2 style="text-align: center">Auxenta Profile</h2> 
             <h4 style="text-align: center">${out_Name}</h4> 
             <h4 style="text-align: center"> ${out_Designation}</h4> 
          </td>
        </tr>
        <tr class="information">
          
        </tr>

        <tr class="item">
          <td style="font-size: 14px">Execative profile</td>
          <td style="font-size: 12px;text-align: left">
            ${out_ExeProfile}
          </td>
        </tr>
        <tr class="item">
          <td style="font-size: 14px">Skills / Techonologies</td>
          <td style="font-size: 12px;text-align: left">
            ${Skill.map(
              skill =>
                '<span style="margin: 6px;text-align: left" > ' +
                skill.label +
                " </span>"
            )}
          </td>
        </tr>
      </table>

      <table>
        <h2>Experiance</h2>

        <tr>
          <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
          <td style="color: white">sasasasasaalsjapijopdwodpqw</td>
        </tr>
        <tr class="item">
          <td>company :</td>
          <td style="font-size: 12px;text-align: left">${Company}</td>
        </tr>

        <tr class="item">
          <td>Designation :</td>
          <td style="font-size: 12px;text-align: left">${DesignationP}</td>
        </tr>

        <tr class="item">
          <td>Duration :</td>
          <td style="font-size: 12px;text-align: left">${Duration}</td>
        </tr>

        <tr class="item">
          <td>Project environment :</td>
          <td style="font-size: 12px;text-align: left">${Environment}</td>
        </tr>

        <tr class="item">
          <td>Technologies:</td>
          <td style="font-size: 12px;text-align: left">${TechnologiesP}</td>
        </tr>

        <tr class="item">
          <td>Qualifications :</td>
          <td style="font-size: 12px;text-align: left">${out_Qualification}</td>
        </tr>

       
      </table>

      <br />
    </div>
  </body>
  <span style="margin-left: 10%;font-size: 10px ">
    Genarated via Recruitment Management System on ${new Date().toUTCString()}
  </span>
</html>


    `;
};

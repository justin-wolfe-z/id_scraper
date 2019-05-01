var outputCSV = '"Label","ID"\n';
var outputHTML = '"Label","ID"<br>';
var chunk = window.location.pathname.split("nodes/");
var smallerChunk = chunk[1].split("/");
var outputNode = smallerChunk[0];
$(".choices").children().each(function(){
    var value = $(this).find(".choice-sample").text();
    if(value){
      const label = $(this).find(".choice-label")
      let key = ''
      if(label.length > 1){
        key = label.children().first().children().first().text();
      } else {
        key = label.text()
      }
      var outputRow = '"'+key+'",'+'"'+value+'"';
      outputCSV += outputRow + "\r\n";
      outputHTML += outputRow + "<br>";
    }
});
var username = prompt("What's your Zapier email?");
if(username){
  while(!username.includes('@') || username[0] === "@"){
    username = prompt("Are you sure that's your Zapier email? It looks like it might be a Slack username. Please try reentering it");
  }
  $.get( "https://hooks.zapier.com/hooks/catch/2003878/zyunoo/", { slack: username, node: outputNode, csv: outputCSV }) 
  .done(function(){
    alert("Successfully sent to Zapbot! You'll get a DM with a link to your CSV in just a sec");
  })
  .fail(function(){
    alert("Bargle! GET request to Zapier failed, probably because the CSV is too long :(. No worries, I'm going to open two new tabs—one with the CSV for you to copy and one for a form where you'll paste that CSV in!");
    window.open("https://zapier.formstack.com/forms/csv_generator_backup?slack="+username+"&node="+outputNode);
    window.open().document.write(outputHTML);
  })
}

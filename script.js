</style><script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.1.0/papaparse.min.js"></script>


<script>
  $(document).ready(function () {
    var instanceCards = [];
    $("#content-container-aria-allowed-role li div[data-automation-id='instance-card']").each(function(){
      var path = $(this).find("td.row-content--07KUh").eq(0).text();
      var snippet = $(this).find("td.row-content--07KUh.snippet--hSNfv").text();
      var howToFix = '';
      instanceCards.push({path,snippet,howToFix});
    });
    var csv = Papa.unparse(instanceCards);
    var link = document.createElement("a");
    link.download = "instanceCards.csv";
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.click();
  });
</script>

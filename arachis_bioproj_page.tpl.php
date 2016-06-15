<!-- Title and guide text  -->
<div>
  <h1>Recent <i>Arachis</i> Bioprojects from NCBI</h1>
</div>


<script  type="text/javascript"  src="/sites/all/modules/arachis_bioproj/arachis_bioproj.js"></script>
<script>
  var method = "<?php echo $method ?>";
  var projectDataType = "<?php echo $project_data_type ?>";
</script>

<div>
  <fieldset>
      <form id="projectDataType"  action="">
      <b>&nbsp;Data Type:</b>&nbsp;&nbsp;
      <input type="radio" name="projectdatatype" value="All"  onclick="FillDomElementWithRecentPubsHtml (this.value, method, 'bioprojectList');">&nbsp;&nbsp;All &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="projectdatatype" value='GeneExp'  checked="checked"  onclick="FillDomElementWithRecentPubsHtml (this.value, method, 'bioprojectList');">&nbsp;&nbsp;Transcriptome/Gene Expression&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="projectdatatype" value='Variation'    onclick="FillDomElementWithRecentPubsHtml (this.value, method, 'bioprojectList');">&nbsp;&nbsp;Variation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </form>

    <fieldset style="margin-left: 100px;margin-top: 5px;margin-bottom: 5px;margin-right: 100px">
      <form id="method"  action="">
              <b>&nbsp;Method:</b>&nbsp;&nbsp;
              <input type="radio" name="method" value="All"  onclick="FillDomElementWithRecentPubsHtml (projectDataType, this.value, 'bioprojectList');">&nbsp;&nbsp;All &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" name="method" value="Array"  onclick="FillDomElementWithRecentPubsHtml (projectDataType, this.value, 'bioprojectList');">&nbsp;&nbsp;Array&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" name="method" value="Sequencing"  checked="checked"  onclick="FillDomElementWithRecentPubsHtml (projectDataType, this.value, 'bioprojectList');">&nbsp;&nbsp;Sequencing&nbsp;&nbsp;
      </form>
    </fieldset>

  </fieldset>
    
  <!-- <p style="font-size:70%"></p> -->

For other legume species visit <a href="http://legumeinfo.org/publications/lis_legume_recent_pubs" target="_blank">Recent Legume Publications</a> at our sister site, LIS.
<br/>
<span style="font-size: 80%;">

  (<i>Content created with up-to-date data from NCBI Pubmed database</i>)
</span> --!>
</div>
<hr/>

<div style="display: none">
<hr/>
</div>

<script>
  var genus = "<?php echo $genus ?>";
  var method = "<?php echo $method ?>";
  var projectDataType = "<?php echo $project_data_type ?>";
</script>

<script>
  //For initial page loading before user interaction
FillDomElementWithRecentPubsHtml (projectDataType, method, 'bioprojectList');
</script>    


<!-- =====================================================================  -->
<div id="bioprojectList">
    <br/><br/><br/><br/><br/>
    <span style='font-size:1.5em;color:#999999'>Please wait: Getting data from NCBI ...   ...   ...</span>
    <br/><br/><br/><br/><br/><br/><br/><br/>
</div>
<hr/>

<!-- END  -->  

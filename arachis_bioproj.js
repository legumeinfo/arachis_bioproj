/*
JS functions for the arachis_recent_pubs module
*/

/*
 *Sudhansu Dash
 *Mar-24-2016
 *
 */

/* TODO:
 *
 *
 */




function makeHtmlFromEsummaryJson(esummaryJson) {  
    //Given a jsonObj from eSummary, generates html <li> for display of Docsummary
    //The jsonOBj could be for one or multiple eSummaries
    // jsonObj passed from jQuery.get(url, f())

    //USAGE:
    //domElementIdHtml += makeHtmlFromEsummaryJson(esummaryJson);
    
    var esummaryResult = esummaryJson.result;  //main json obj containing uids list and summary for each uid
    var uidsList = esummaryResult.uids;  // array of all uids in the jsonObj from eSummary
      //(.result.uids is from the ncbi esummary json)
      //console.log("uidsList: " + uidsList.join()); //debug
    
    citation_html ="";
    
    uidsList.forEach(function(uid) {
        //Go through each uid and extract the attributes to make html
        //console.log("for-each: " + uid); //debug
        
	var projectAcc = esummaryResult[uid]['project_acc'];
	var methodType = esummaryResult[uid]['project_methodtype'];
	var name = esummaryResult[uid]['organism_name'];
	var data = esummaryResult[uid]['project_data_type'];
	var title = esummaryResult[uid]['project_title'];
	var id = esummaryResult[uid]['project_id'];
	var description = esummaryResult[uid]['project_description'];
        var linkToUid = "<a " + "href=\"http://www.ncbi.nlm.nih.gov/bioproject/" + id + "\" "
			     + " target=_blank" + ">" + projectAcc + "</a>";  
        var details = "<a onclick=\"jQuery(this).next('fieldset').toggle();\">&nbsp;&nbsp;Details <b>[&plusmn;]</b></a>"
            + "<fieldset id='details'  style='display:none;background-color: #EFEFEF'>"
            + "<b>Project name:</b> " + title + "<br/>"
            + " (" + "<b>Organism:</b> " + "<i>" + name + "</i>" + "; "
            + "<b>Method:</b> " + methodType + "; "
	    + "<b>Project type:</b> " + data + "; "
            + ")." + "<br/>"
            + "<b>Project description:</b><br/> " + description
            + "</fieldset>";
		
        var citation = (linkToUid + ": " + title);

        var citation_li = "<li>" + citation + details + "</li><br/>"; // + "\n\n";
	     
        //Creates like:
        //Dash S, Campbell JD, Cannon EK, Cleary AM, ......, Farmer AD, Cannon SB. 2016. Legume information system (LegumeInfo.org): a key component of a set of federated data resources for the legume family. Nucleic Acids Res 44(D1):D1181-8. (<a href="http://www.ncbi.nlm.nih.gov/pubmed/26546515"  target="_blank">26546515</a>)
        //console.log("citation_li: " + citation_li); //debug
        citation_html += citation_li; 
        
    })  //uidsList.forEach
    
    //console.log("citation_html: " + citation_html); //debug
    return citation_html; // Returns XMLHttpRequest {}
        
}  //function makeHtmlFromEsummaryJson(EsummaryJson)




//The main function
//=================

function FillDomElementWithRecentPubsHtml (projectDataType, method, domElementId) {
    
    var message = "";
    var messageInitial = "<span style='font-size:1.5em;color:#999999'>Please wait: Getting data from NCBI ...   ...   ...</span>";
    //Show intial message
    jQuery("#" + domElementId).html (messageInitial);
  
	//Get selected gorm inputs  
    projectDataType = jQuery("form#projectDataType  input:checked").val();
    method = jQuery("form#method  input:checked").val();

    console.log("projectDataType: " + projectDataType); //debug
    console.log("method: " + method); //debug


    
    //Set up htmlContent
    var htmlContent = "";

    //Construct Esearch URL
    var BaseUrlEsearch = "http:" + "//eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?" + "db=bioproject" + "&retmode=json" + "&retmax=10000";
    var searchTerm = "(Arachis[Organism])";
    var termOrganism = "([Arachis])";
    var termMethod = "(" + "\"method " +  method +"\"[Properties])";
    var termProjectDataType = '';

    switch (projectDataType) {
        case 'All':
            termProjectDataType = '';
            break;
        case 'GeneExp':
            termProjectDataType = "+AND+(\"Transcriptome+or+Gene+expression\"[Project+Data+Type])";
            break;
        case 'Variation':
            termProjectDataType = "+AND+(\"variation\"[Project+Data+Type])";
            break;
    }
 query = "&term=" + termOrganism + termProjectDataType;

    if (method != "All") {
        query = query + "+AND+" + termMethod;
    } else {
        query = query;


    }


    var UrlEsearch = BaseUrlEsearch + query; //returns json obj
    console.log("UrlEsearch: " + UrlEsearch);

    
    //Get json from UrlEsearch
    
    //Http Request
    jQuery.get(UrlEsearch,status, function(esearchJson){
    //jQuery.post(UrlEsearch,status, function(esearchJson){
        
        //pubmed id counts from Esearch
        var esearchCount = esearchJson.esearchresult.count;
        
        //Message while waiting 'No of items found'
        message = "Found " + esearchCount + " items.  <br/>" + messageInitial;
        jQuery("#" + domElementId).html (message);
        var esearchRetmax = esearchJson.esearchresult.retmax;
        console.log ("esearchCount: " + esearchCount + "; esearchRetmax: " + esearchRetmax); //debug
        
        //pubmed id list from Esearch
        var esearchIdlist = esearchJson.esearchresult.idlist;
        console.log ("esearchIdlist: " + esearchIdlist.join() ); //debug
        esearchIdlist900Max = esearchIdlist.slice(0, 900);;  //Max limit Ids preserved for pubmedUrl (pubmed url limit)
        
        //Processing based on esearchIdlist is
        var messageAddendum = '';
        
        switch (esearchIdlist != undefined) {
            case esearchCount == 0:
                message = "None Found at NCBI<br/>";
                jQuery("#" + domElementId).html (message);
                return;
            case esearchCount > 100:
                message = "Found " + esearchCount + " items; but showing only 100.";
                messageAddendum = " (showing only 100) ";
                jQuery("#" + domElementId).html (message + " <br/> " + messageInitial);
                esearchIdlistTrunc = esearchIdlist.slice(0, 100); //Truncated Idlist
                esearchIdlist = esearchIdlistTrunc;  //Think about this
                break;
            default:
                message = "Found " + esearchCount + " items.  <br/>" + messageInitial
                jQuery("#" + domElementId).html (message);
            } 
        
        //console.log("messageADDENDUM: " + messageAddendum);
        
        //Pass Esearch Idlist to get Esummary
//CAUTION:   If too many Ids, fails. "XMLHttpRequest cannot load ......    The response had HTTP status code 502. "         
        var esummaryUrl = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=bioproject&retmode=json" + "&id="
                           + esearchIdlist.join();
        console.log("esummaryUrl: " + esummaryUrl); //debug
        jQuery.get(esummaryUrl,status, function(esummaryJson){
            
            var pubmedUrl = "http://www.ncbi.nlm.nih.gov/bioproject/" + esearchIdlist900Max.join();
            console.log("pubmedUrl: " + pubmedUrl);
            
            message = "<span>" + "Found&nbsp;<b>" + esearchCount + "</b>" + messageAddendum + "&nbsp;bioprojects " 
                      + "at NCBI" 
                      +"</span>";
            pubmedLink = " <a href=\"" + pubmedUrl + "\"  target=\"_blank\"> (Link to NCBI) </a>";
            //htmlContent += message + "<br/><br/>";            
            htmlContent += message + pubmedLink + "<br/><br/>";
            
            htmlContent += makeHtmlFromEsummaryJson(esummaryJson);
            
            //Fill with htmlContent
            jQuery("#" + domElementId).html (htmlContent);
            
            
            })
        
        
    }) //lQ.get(UrlESearch.......)
    
    
    

} // FillDomElementWithRecentPubsHtml()

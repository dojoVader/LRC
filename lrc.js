/**
 * @author Okeowo Aderemi
 * @description LRC Simple Parser
 */
(function(jquery){
	//Parses the LRC Data
	function lrcParser(data){
	//LRC Parsing
	//Split the Data into Arrays
    var _arrayOfLrc=data.split("\n");
    
    var _LRC={
     meta:{},
     text:[],
     lyrics:[]
     
    };
    
    _arrayOfLrc.forEach(function(item,index,ar){
        //Meta Data
        		var metaData=/\[(\D+):(\D+)\]/;
                var textData=/^(\w+)/;
                var timeData=/^(\[\d+:\d+\.\d+\]|\[\d+:\d+\])(.+)/;
        //Meta Data        
		if(metaData.test(item)){
			var d=metaData.exec(item);
           
            //push tp meta
            
            _LRC.meta[d[1]]=d[2];
           
		}
        else if(textData.test(item)){
            _LRC.text.push(textData.exec(item)[1]);
        }
        else if(timeData.test(item)){
           var data=timeData.exec(item);
           _LRC.lyrics.push({'time':data[1],'lyrics':data[2]});
           data=null; //clean
            
        }
       
    });
    
    return _LRC;
	}
	
//Invoke the Function here
	
	jquery.ajax("Bon Jovi - Always.lrc").then(function(data){
		console.group("LRC Ajax");
		console.log(lrcParser(data));
		console.groupEnd();
	});
})(jQuery);
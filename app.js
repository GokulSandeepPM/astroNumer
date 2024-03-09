let choiceNumbers = ['99','97','95','93','92','89','88','87','85','84','80','79','77','74','73','72','68','66','64','54','51','45','42','41','37','32','29','22','16','14','12','10','08','06','04'];
let genList=[];
let divHTML = '';
let currentStart = 1;

function setLoad(){
	$.each(choiceNumbers, function(ind, val) {
		$("#checkBoxNo"+val).prop("checked", true);
	});
}

function updateList(event){
	let isChecked = $('#'+event.target.id).is(":checked");
	let selectedValue = $('#'+event.target.id).val();
	if(isChecked){
		choiceNumbers.push(selectedValue);
	}else{
		let index = choiceNumbers.indexOf(selectedValue);
		if (index !== -1) {
		  choiceNumbers.splice(index, 1);
		}
	}
}



function sumOfDigit(num) { 
    return num.toString().split("") 
        .reduce((sum, digit) => 
            sum + parseInt(digit), 0); 
} 

function generate(){
	choiceNumbers.sort();
	genList = [];
	let firstSet = parseInt($('#firstSet').val());
	let secondSet = parseInt($('#secondSet').val());
	let thirdSet = parseInt($('#thirdSet').val());
	let fourthSet = parseInt($('#fourthSet').val());
	let fifthSet = parseInt($('#fifthSet').val());
	let sixthSet = parseInt($('#sixthSet').val());
	let sum = parseInt($('#sumVal').val());
	if(firstSet < 0 || firstSet > 99){
		alert('First Set value is invalid');
		return 0;
	}
	else if(secondSet < 0 || secondSet > 99){
		alert('Second Set value is invalid');
		return 0;
	}
	else if(thirdSet < 0 || thirdSet > 99){
		alert('Third Set value is invalid');
		return 0;
	}
	else if(fourthSet < 0 || fourthSet > 99){
		alert('Fourth Set value is invalid');
		return 0;
	}
	else if(fifthSet < 0 || fifthSet > 99){
		alert('Fifth Set value is invalid');
		return 0;
	}
	else if(sixthSet < 0 || sixthSet > 99){
		alert('Sixth Set value is invalid');
		return 0;
	}
	else if(isNaN(sum) ||sum == null || sum == undefined || (sum < 0 || sum > 99)){
		alert('Sum value is invalid');
		return 0;
	}
	let loop1 = choiceNumbers;
	let loop2 = choiceNumbers;
	let loop3 = choiceNumbers;
	let loop4 = choiceNumbers;
	let loop5 = choiceNumbers;
	let loop6 = choiceNumbers;
	if( !(isNaN(firstSet) || firstSet == null || firstSet == undefined ))
		loop1 = [$('#firstSet').val()];
	if(!(isNaN(secondSet)|| secondSet == null || secondSet == undefined ))
		loop2 = [$('#secondSet').val()];
	if(!(isNaN(thirdSet)|| thirdSet == null || thirdSet == undefined))
		loop3 = [$('#thirdSet').val()];
	if(!(isNaN(fourthSet)|| fourthSet == null || fourthSet == undefined))
		loop4 = [$('#fourthSet').val()];
	if(!(isNaN(fifthSet)|| fifthSet == null || fifthSet == undefined))
		loop5 = [$('#fifthSet').val()];
	if(!(isNaN(sixthSet)|| sixthSet == null || sixthSet == undefined ))
		loop6 = [$('#sixthSet').val()];
	
	$.each(loop1, function(ind1, val1) {
		$.each(loop2, function(ind2, val2) {
			$.each(loop3, function(ind3, val3) {
				$.each(loop4, function(ind4, val4) {
					$.each(loop5, function(ind5, val5) {
						$.each(loop6, function(ind6, val6) {
							let tempSum = sumOfDigit(val1)+ sumOfDigit(val2) + sumOfDigit(val3) + sumOfDigit(val4) + sumOfDigit(val5) + sumOfDigit(val6) ;
							if(tempSum == sum)
								genList.push(''+val1+''+val2+''+val3+''+val4+''+val5+''+val6)
						});
					});
				});
			});
		});
	});
	let finalList = {};
	let finalcnt = 0;
	for(let cnt=0;cnt<genList.length;cnt++){
		let curNum = genList[cnt];
		let num = [];
		let temp=[];
		let tmp=[];
		for(let cnt1=0;cnt1 < curNum.length; cnt1++){
			temp.push(parseInt(curNum[cnt1]));
		}
		while(temp.length > 1){
			let lctmp =[];
			for(let i=1;i<temp.length;i++){
				let ss = temp[i-1]+temp[i];
				if(ss >= 10) ss = ss - 9;
				lctmp.push(ss);
			}
			temp = [...lctmp];
			num.push([...temp]);
		}
		num.reverse();
		let checkNum = num[1].join('');
		if(choiceNumbers.indexOf(checkNum) != -1){
			if(finalList[checkNum] == undefined)
				finalList[checkNum] = [];
			finalList[checkNum].push(genList[cnt]);
			finalcnt++;
		}
	}
	
	let divNumText = '';
	divHTML = ''
	let keyArray = Object.keys(finalList);
	for(let cnt = 0 ; cnt <keyArray.length; cnt++){
		let key = keyArray[cnt];
		let val = finalList[key];
		divNumText += '<br/> <div class="row col-sm-12 numberTitle"> <span class="row col-sm-12">The number with '+key+' as total : </span><br/>';
		divHTML += '\n The number with '+key+' as total : \n';
		for(let cnt=0;cnt<val.length;cnt++){
			divNumText += '<div class="col-sm-2 col-md-1 numberEntry no-padding">'+ val[cnt] +'</div>';
			divHTML += val[cnt];
			divHTML += ((cnt+1)%5 == 0)?'\n':'\t';
		}
		divHTML +='\n';
		divNumText += "</div><hr/>"
	};
	console.log(divNumText); 
	// let tableHTML = ''
	// let divHTML = ''
	// for(let cnt=0;cnt<genList.length;cnt++){
		// tableHTML += '<div class="col-sm-2 col-md-1 numberEntry no-padding">'+ genList[cnt] +'</div>';
		// divHTML += (cnt+1)+'.\t'+genList[cnt]+'\n';
	// }
	$('#genListDisplay').html('<br />' + divNumText);
	$('#exportList').html(divHTML);
	$('#cntDisplay').html('There are '+finalcnt+' numbers generated.')
	if(genList.length != 0)
		$('#exportPDF').show();
}

 function exportPDF() {
	let doc = new jsPDF('p', 'pt', 'a4');
	//Dimension of A4 in pts: 595 × 842
	doc.setFontSize(10);
	let pageWidth = 595;
	let pageHeight = 842;
	let y=800;
	let pageMargin = 20;

	pageWidth -= pageMargin * 2;
	pageHeight -= pageMargin * 2;

	let cellMargin = 5;
	let cellWidth = 110;
	let cellHeight = 20;

	let startX = pageMargin;
	let startY = pageMargin;

	function createCard(num) {

	if (startY >= pageHeight)
	{
	  doc.addPage();
	  startY = pageMargin // Restart height position
	}
	  doc.text(num, startX, startY);
	  
	  startY = startY + cellHeight;

	}

	let tmpList = divHTML.split('\n')
	for (let i = 0; i < tmpList.length; i++) {
	  createCard(tmpList[i]+'\n');
	}
	
	let firstSet = $('#firstSet').val();
	let secondSet = $('#secondSet').val();
	let thirdSet = $('#thirdSet').val();
	let fourthSet = $('#fourthSet').val();
	let fifthSet = $('#fifthSet').val();
	let sixthSet = $('#sixthSet').val();
	let sum = $('#sumVal').val();
	
	let filename = 'NumberList-'+((firstSet == '')?'xx':firstSet)+((secondSet == '')?'xx':secondSet)+((thirdSet == '')?'xx':thirdSet)+((fourthSet == '')?'xx':fourthSet)+((fifthSet == '')?'xx':fifthSet)+((sixthSet == '')?'xx':sixthSet)+'-'+((sum == '')?'xx':sum)+'.pdf';

	doc.save(filename);
}

function calcNumerology(){
	$('#kattam1').html('');
	$('#kattam2').html('');
	$('#kattam3').html('');
	$('#kattam4').html('');
	$('#kattam5').html('');
	$('#kattam6').html('');
	$('#kattam7').html('');
	$('#kattam8').html('');
	$('#kattam9').html('');
	$('#kattam10').html('');
	$('#kattam11').html('');
	$('#kattam0').html('');
	$('#numerologyPyramid').html('');
	
	let alpha2Num = {'a':1,'b':2,'c':3,'d':4,'e':5,'f':8,'g':3,'h':5,'i':1,'j':1,'k':2,'l':3,'m':4,'n':5,'o':7,'p':8,'q':1,'r':2,'s':3,'t':4,'u':6,'v':6,'w':6,'x':5,'y':1,'z':7,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'0':0};
	let alpha2Num1 = {'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,'j':1,'k':2,'l':3,'m':4,'n':5,'o':6,'p':7,'q':8,'r':9,'s':1,'t':2,'u':3,'v':4,'w':5,'x':6,'y':7,'z':8,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'0':0};

	let name = $('#nametxt').val().replace(/\s/g, '').replace(/\./g, "");
	
	let sum=0;

	let num = [];
	let temp=[];
	let tmp=[];
	for(let cnt=0;cnt < name.length; cnt++){
		sum +=alpha2Num[name[cnt].toLowerCase()];
		temp.push(alpha2Num[name[cnt].toLowerCase()]);
		tmp.push(name[cnt].toUpperCase());
	}
	let sumcal = "= "+sum;
	let addSpace = "";
	for(let cnt=0;cnt < sumcal.length;cnt++){
		addSpace +="&nbsp";
	}
	
	tmp.push(sumcal);
	num.push([...temp]);
	while(temp.length > 1){
		let lctmp =[];
		for(let i=1;i<temp.length;i++){
			let ss = temp[i-1]+temp[i];
			if(ss >= 10) ss = ss - 9;
			lctmp.push(ss);
		}
		temp = [...lctmp];
		num.push([...temp]);
	}
	num.reverse();
	tmp.push("/ "+num[1].join(''));
	let divText = "";
	for(let cnt=0;cnt<num.length;cnt++){
		divText += "<span> "+num[cnt].join(" ")+addSpace+"</span><br/>";
	}
	divText += "<br/><span> "+tmp.join(" ")+"</span><br/><br/><br/>";
	$('#numerologyPyramid').html(divText);
	
	let kattamJson = {'0':'','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':''};
	let kattamsum = alpha2Num1[name[0].toLowerCase()];
	kattamJson[''+kattamsum] = kattamJson[''+kattamsum]+name[0].toUpperCase()+" ";
	
	for(let cnt=1;cnt < name.length; cnt++){
		kattamsum = (kattamsum + alpha2Num1[name[cnt].toLowerCase()] - 1)%12;
		kattamJson[''+kattamsum] = kattamJson[''+kattamsum]+name[cnt].toUpperCase()+" ";
	}
	
	tmpJSON = {}
	for(let cnt = 0; cnt < 12 ; cnt++){
		tmpJSON[''+((cnt+currentStart-1)%12)] = kattamJson[''+cnt];
	}
	kattamJson = {...tmpJSON}
	
	$('#kattam1').html(kattamJson['1']);
	$('#kattam2').html(kattamJson['2']);
	$('#kattam3').html(kattamJson['3']);
	$('#kattam4').html(kattamJson['4']);
	$('#kattam5').html(kattamJson['5']);
	$('#kattam6').html(kattamJson['6']);
	$('#kattam7').html(kattamJson['7']);
	$('#kattam8').html(kattamJson['8']);
	$('#kattam9').html(kattamJson['9']);
	$('#kattam10').html(kattamJson['10']);
	$('#kattam11').html(kattamJson['11']);
	$('#kattam0').html(kattamJson['0']);
	
}

function changeStart(n){
	Array.from(document.querySelectorAll('.disKattam')).forEach(
	  (el) => el.classList.remove('active')
	);
	$('#kattam'+n).addClass("active");
	currentStart = n;
	calcNumerology();
}
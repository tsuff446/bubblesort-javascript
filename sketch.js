var listSize;	
var maxHeight = 45;
var rectWidth;
var rectHeightScale;
var list;
var sortedList;
var tickrate;
var index;
var end;
var done;

function setup(){
	createCanvas(windowWidth*199/200, windowHeight*195/200);
	done = false;
	tickrate = 10;
	listSize = 8;
	index = 0;
	params = getURLParams();
	if(params.size)
		listSize = parseInt(params.size);
	if(params.rate)
		tickrate = parseInt(params.rate);

	list = new Array(listSize);
	list = list.fill(0);
	list = list.map(x => Math.floor(Math.random()*maxHeight)+1);
	sortedList = list.slice();
	sortedList.sort(greaterThan);

	rectWidth = width/listSize;
	rectHeightScale = height/maxHeight;

	end = listSize-1;
	frameRate(tickrate);
}

function draw(){
	clear();
	for(var i = 0; i < listSize; i++){
		if(done || (list[i] == sortedList[i] && i > end))
			fill(0,255,0);
		else if(i == index)
			fill(255,0,0);
		else
			fill(255,255,255);
		rect(i*rectWidth, height - list[i]*rectHeightScale, rectWidth, list[i]*rectHeightScale);
	}

	if(!checkSame(list,sortedList)){
			if(list[index] > list[index+1]){
				swap(list, index, index+1);
				if(index + 1 == end){
					end -= 1;
				}
			}

		index++;
		if(index > end)
			index = 0;
	}else{
		done = true;
	}
	
}

function swap(arr, x,y){
	var temp = arr[x];
	arr[x] = arr[y];
	arr[y] = temp;
}
function greaterThan(x,y){
	return x-y;
}
function checkSorted(x,y){
	if(x > y)
		return true;
	return false;
}
function checkSame(original,sorted){
	for(var i = 0; i < listSize; i++){
		if(original[i] != sorted[i])
			return false;
	}
	return true;
}
function windowResized() {
  resizeCanvas(windowWidth*199/200, windowHeight*195/200);
}
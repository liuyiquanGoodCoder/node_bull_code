const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
let linecount = 0;
let usercount = 0;
let groupcount = 0;
let likeMap = {};

rl.on('line',function(line) {
    if (linecount==0) {
        usercount = parseInt(line);
        linecount++;

    }else if (linecount==1) {
        let likeArray = line.split(' ');
        likeArray.forEach(function(likeKey,index) {
            if(likeMap[likeKey]){
                likeMap[likeKey].push(index+1);
            }else{
                likeMap[likeKey]=[index+1]
            }
        });
        linecount++;
    }else if (linecount==2) {
        groupcount=parseInt(line);
        linecount++;
    }else{
        let valueArray=line.split(' ');
        let l = parseInt(valueArray[0]);
        let r = parseInt(valueArray[1]);
        let key = parseInt(valueArray[2]);
        let result=0;

        if (likeMap[key]) {
            likeMap[key].forEach(function(tag) {
                if (tag<=r && tag>=1) {
                    result++;
                }
            })
        }
        linecount++;
        console.log(result);
        groupcount--;

        if (groupcount==0) {
            linecount=0;
            process.exit(0);
        }

    }
})

// 输入： 第1行为n代表用户的个数 
// 第2行为n个整数，第i个代表用户标号
// 为i的用户对某类文章的喜好度 
// 第3行为一个正整数q代表查询的组数  
// 第4行到第（3+q）行，每行包含3个整数l,r,k代表一组查询，
// 即标号为l<=i<=r的用户中对这类文章喜好值为k的用户的个数。 
// 数据范围n <= 300000,q<=300000 k是整型
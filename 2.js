import { createInterface } from 'readline';
let rl = createInterface({
	input:process.stdin,
	output:process.stdout
}); 


let count = 0,
	n,
	m,
	c,
	err = 0;


let Beads = {};
let last;

rl.on('line',(line)=>{
	if(count==0){
		[n,m,c] = line.split(' ').map(ele=>+ele);
		count++;
		last = n - m;
	}

	else if(count <= n ){
		let nowBead = line.split(' ');
		let ColorNum = +nowBead[0];
		
		for(let i=1;i<=ColorNum;i++){
			let nowColor = nowBead[i];
			if(Beads[nowColor]=='err'){
				continue;
			}else if(!Beads[nowColor]){
				Beads[nowColor] = [count, count];
			}else{
				let BNC = Beads[nowColor];
				if(count - BNC[1] > m-1){
					BNC[1]=count;
					if(count - last){
						if(BNC[0]+n-count <= m-1){
							Beads[nowColor] = 'err';
							err++;
						}
					}

				}else{
					Beads[nowColor] = 'err';
					err++;
				}
			
			}
		}

		count++;
		if(count>n){
			console.log(err);
			rl.close();
		}
	}
})

import bread from 'assets/bread.svg';
import cake from 'assets/cake.svg';
import cupcake from 'assets/cupcake.svg';
import doughnut from 'assets/doughnut.svg';
const imgs = [ { bread }, { cake }, { cupcake }, { doughnut } ];

export function userImage() {
	return imgs[Math.floor(Math.random() * Math.floor(imgs.length))];
}

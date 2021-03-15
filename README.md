# ragemaker
ragemaker.net is down (flash too) i try to create a clone of ragemaker.net with JS

	/*
			<div class="body">
		<canvas id="myCanvas" width="100" height="100"></canvas>
		<button onclick="DownloadCanvasAsImage()">Download</button>
	</div>
		const canvas = document.getElementById('myCanvas');
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'red';
		ctx.fillRect(0,0,100,100);
		ctx.lineWidth = 10;
		ctx.strokeRect(20, 20, 60, 60);

		function DownloadCanvasAsImage(){
			let downloadLink = document.createElement('a');
			downloadLink.setAttribute('download', 'CanvasAsImage.png');
			let canvas = document.getElementById('myCanvas');
			let dataURL = canvas.toDataURL('image/png');
			let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
			downloadLink.setAttribute('href',url);
			downloadLink.click();
		}
		*/
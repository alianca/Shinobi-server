package  {
	import flash.display.*;
	import VilaOculta;
	import flash.text.TextDisplayMode;
	import fl.text.TLFTextField;
	import flash.geom.ColorTransform;
	import flash.events.Event;
	import flash.net.URLRequest;
	
	public class VilaDisplay extends MovieClip {
		private var vila:VilaOculta;
		private var descricao:TLFTextField;
		private var num_ninjas:TLFTextField;
		private var nome:TLFTextField;
		private var foto:Bitmap;
		
		public function VilaDisplay() {
						
		}
		public function setVila(vila:VilaOculta):void
		{
			
			descricao = new TLFTextField();
			descricao.y = 110;
			descricao.text = vila.descricao;
			var corT:ColorTransform = transform.colorTransform;
			corT.color = 0x307767;
			descricao.transform.colorTransform = corT;
			
			nome = new TLFTextField();
			nome.x = 39.7;
			nome.y = 75.8;
			nome.height = 11;
			nome.text = vila.nome;
			nome.transform.colorTransform = corT;
			
			num_ninjas = new TLFTextField();
			num_ninjas.text = String(vila.num_ninjas);
			num_ninjas.x=40.9;
			num_ninjas.y=91.15;
			num_ninjas.transform.colorTransform = corT;
			
			//var loader:Loader = new Loader();
			//var requisicao:URLRequest = new URLRequest(vila.foto);
			//loader.contentLoaderInfo.addEventListener(Event.COMPLETE,completeBitmap);
			//loader.load(requisicao);
			
			addChild(descricao);
			addChild(num_ninjas);
			addChild(nome);
		}
		private function completeBitmap(evt:Event):void
		{
			foto = evt.currentTarget.content;
			addChild(foto);
		}

	}
	
}

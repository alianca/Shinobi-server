package  {
	import flash.display.*;
	import flash.text.TextDisplayMode;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.events.MouseEvent;
	
	public class VilaOculta extends MovieClip {
		public var id:uint;
		public var nome:String;
		public var pais:TextField;
		public var foto:String;
		public var simbolo:Sprite;
		public var descricao:String;
		public var num_ninjas:uint;

		public function VilaOculta() {
			// constructor code
			pais = new TextField;
			pais.text = "PAIS DO COCO";
			pais.x=17.25;
			var fonte:TextFormat = new TextFormat();
			fonte.size = 9;
			fonte.color = 0xFFFFFF;
			fonte.font = "Franklin Gothic Medium Cond";
			pais.setTextFormat(fonte);
			addChild(pais);
			
			addEventListener(MouseEvent.CLICK,clique);
			
		}
		public function clique(evt:MouseEvent):void
		{
			VilaDisplay(parent.getChildAt(1)).setVila(this);
		}
		public function addXML(xml:XML):void
		{
			nome = xml.nome;
			id = xml.id;
			num_ninjas = xml.num_ninjas;
			descricao = xml.descricao;
		}
		public function print():void
		{
			trace("Vila: "+nome);
			trace(num_ninjas + " ninjas.");
		}
		
		

	}
	
}

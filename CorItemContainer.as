package  {
	import flash.net.*;
	import flash.events.*;
	import flash.display.*;
	import CorItem;
	import ItensContainer;
	
	public class CorItemContainer extends MovieClip{
		private var loader:URLLoader;
		private var requisicao:URLRequest;
		private var x_offset:uint;
		private var y_offset:uint;
		public var cores:Array = [];
		public var default_color:uint;
		
		public function CorItemContainer(end:String="cores") {
			// constructor code
			requisicao = new URLRequest(end + ".xml");
			loader = new URLLoader();			
			loader.addEventListener(Event.COMPLETE ,completeDownload);
			loader.load(requisicao);
		}
		private function completeDownload(e:Event):void
		{
			var lista:XML = new XML(loader.data);
			var dir:String = lista.@dir+"/";
			for each (var child:XML in lista.item)
			{
				placeColorBox(uint(child));
			}
			default_color = cores[0].cor;
			ItensContainer(parent.getChildAt(1)).setDefaultColor(default_color);
		}
		public function placeColorBox(newColor:uint,name:String=null):void
		{
				var cor:CorItem = new CorItem(newColor);
				addChild(cor);
				cores.push(cor);
				cor.x = x_offset;
				cor.y = y_offset;
				x_offset+=30;
				cor.addEventListener(MouseEvent.CLICK,changeColors);
		}
		public function changeColors(evt:MouseEvent):void
		{
			var itens:ItensContainer=evt.target.parent.parent.getChildByName("itensContainer");
			itens.changeColors(evt.target.cor);
		}
		public function hello():void
		{
			trace("helllooooo");
		}
	}
	
}

package 
{
	import flash.display.*;
	import flash.events.*;
	import flash.net.*;
	import ItemLoader;
	import flash.geom.ColorTransform;

	public class ItensContainer extends MovieClip
	{
		private var loader:URLLoader;
		private var requisicao:URLRequest;
		private var lista:XML;
		private var itens:Array = [];
		private var stageItem:Item;

		private var x_offset:int = 0;
		private var y_offset:int = 0;
		private var default_width:Number = 72.5;
		private var default_height:Number = 72.5;
		private var border:uint = 0;
		private var cor:uint;

		public function ItensContainer(end:String="xmls/itens")
		{
			// constructor code
			requisicao = new URLRequest(end + ".xml");
			loader = new URLLoader();			
			loader.addEventListener(Event.COMPLETE ,completeDownload);
			loader.load(requisicao);
		}
		public function setDefaultColor(novaCor:uint):void
		{
			cor = novaCor;
		}
		private function completeDownload(e:Event):void
		{
			lista = new XML(loader.data);
			var dir:String = lista. @ dir + "/";
			for each (var child:XML in lista.item)
			{
				var itemLoader:ItemLoader = new ItemLoader();
				itemLoader.addEndereco(dir,child);
				itemLoader.Load(placeItemMenu);
			}

		}
		private function placeItem(item:Item):void
		{
			var preview:MovieClip = MovieClip(MovieClip(stage.getChildAt(0)).getChildByName("char_preview"));
			if(stageItem != null)
				preview.removeChild(stageItem);
			preview.addChild(item);
			item.changeColor(cor);
			stageItem = item;
			
		}
		private function placeItemMenu(item:Item):void
		{
			var scale:Number;
			// Posicionamento
			var quadro:DisplayObject = item.getChildByName("quadro");
			quadro.x=0;
			quadro.y=0;
			item.x = x_offset;
			item.y = y_offset;
			// Redimensionamento
			if (item.width > item.height)
			{
				scale = default_width / item.width;
				item.scaleX = scale;
				item.scaleY = scale;
			}
			else
			{
				scale = default_height / item.height;
				item.scaleX = scale;
				item.scaleY = scale;
			}
			// Ajustes na iteracao
			//x_offset +=  item.width + border;
			//x_offset += 72.5;
			// Inclui o objeto
			itens.push(item);
			var slot = getChildByName("slot"+itens.length);
			slot.addChild(item);
			
			// Mudanças no Objeto
			item.changeColor(cor);
			
			setItemDefault();
			item.addEventListener(MouseEvent.CLICK,setItem);
		}
		public function setItemDefault():void
		{
			var loader = new ItemLoader();
			loader.addUrl(itens[0].getUrl());
			loader.Load(placeItem);
		}
		public function setItem(evt:Event):void
		{
			var tempItem:Item = evt.target.parent.parent;
			var loader = new ItemLoader();
			loader.addUrl(tempItem.getUrl());
			loader.Load(placeItem);
		}
		
		public function changeColors(novaCor:uint):void
		{
			cor = novaCor;
			for each (var item:Item in itens)
			{
				item.changeColor(novaCor);
			}
			if(stageItem)
			{
				stageItem.changeColor(novaCor);
			}
		}

	}
}
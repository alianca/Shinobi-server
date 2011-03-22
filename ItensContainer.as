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
		private var lista:XML;
		private var itens:Item;
		private var stageItem:Item;

		private var x_offset:int = 10;
		private var y_offset:int = 10;
		private var default_width:Number = 80;
		private var default_height:Number = 80;
		private var border:uint = 10;

		public function ItensContainer(end:String="itens")
		{
			// constructor code
			var requisicao:URLRequest = new URLRequest(end + ".xml");
			loader = new URLLoader();
			loader.addEventListener(Event.COMPLETE ,completeDownload);
			loader.load(requisicao);
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
			if(stageItem != null)
				stage.removeChild(stageItem);
			stage.addChild(item);
			stageItem = item;
		}
		private function placeItemMenu(item:Item):void
		{
			var scale:Number;
			// Posicionamento
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
			x_offset +=  item.width + border;
			// Inclui o objeto
			addChild(item);
			item.addEventListener(MouseEvent.CLICK,setItem);
		}
		public function setItem(evt:Event):void
		{
			//stage.removeChild(getChildAt(2));
			var tempItem:Item = evt.target.parent.parent;
			var loader = new ItemLoader();
			loader.addUrl(tempItem.getUrl());
			loader.Load(placeItem);

		}
		public function changeColors(evt:Event):void
		{
			var cor_box:DisplayObject;
			var cores:Array = evt.target.parent.parent.getColors();
			var i:uint = 1;
			for each (var cor:uint in cores)
			{
				if(getChildByName("cor"+i))
				{
					cor_box = getChildByName("cor"+i);
					cor_box.visible = true;
					var corT:ColorTransform = cor_box.transform.colorTransform;
					corT.color = cor;
					cor_box.transform.colorTransform = corT;
				}
				i++;
			}
			for(i;i<=4;i++)
			{
				if(getChildByName("cor"+i))
				{
					getChildByName("cor"+i).visible = false;
				}
			}

		}

	}
}
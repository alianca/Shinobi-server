package 
{
	
	import flash.geom.ColorTransform;
	import fl.motion.Color;
	import Item;
	import flash.display.*;
	import flash.net.URLRequest;
	import flash.events.*;
	
	public class ItemLoader extends Loader
	{
		private var url:String;
		private var item:Item;
		private var callback:Function;
		
		public function ItemLoader():void
		{
			super();
		}
		public function addUrl(endereco:String):void
		{
			url = endereco;
			item = new Item(url);
		}
		public function addEndereco(dir:String,xml:XML):void
		{
			
			// Adiciona as cores
			url = dir + xml.endereco;
			item = new Item(url);
			
			for each (var string_cor:String in xml.cores.cor)
			{
				var nova_cor:uint = uint(string_cor);
				item.addColor(nova_cor);
			}
			
		}
		public function Load(listener:Function):void
		{
			callback = listener;
			contentLoaderInfo.addEventListener(Event.COMPLETE,completeDownload);
			load(new URLRequest(url));
		}
		private function completeDownload(evt:Event):void
		{
			var movie:MovieClip = evt.currentTarget.content;
			//movie.quadro.x =0;
			//movie.quadro.y =0;
			item.addChild(movie.quadro);
			removeEventListener(Event.COMPLETE,completeDownload);
			callback(item);
		}
	}

	
}
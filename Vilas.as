package  {
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.display.*;
	import VilaOculta;
	
	public class Vilas extends MovieClip{
		private var vilas:Array = [];

		public function Vilas(end:String="xmls/vilas") {
			// constructor code
			var requisicao:URLRequest = new URLRequest(end+".xml");
			var loader:URLLoader = new URLLoader();
			loader.addEventListener(Event.COMPLETE, completeDownload);
			loader.load(requisicao);
		}
		private function completeDownload(evt:Event):void
		{
			var offset:uint = 0;
			var vilas_xml:XML = new XML(evt.target.data);
			for each( var vila_xml:XML in vilas_xml.vilaOculta )
			{
				var vila = new VilaOculta();
				vila.addXML(vila_xml);
				vilas.push(vila);
				vila.x = 5;
				vila.y = offset;
				offset += 17;
				addChild(vila);
			}
			
		}
		public function print():void
		{
			
		}

	}
	
}

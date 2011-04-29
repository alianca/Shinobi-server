package  {
	import flash.display.MovieClip;
	import ItemLoader;
	import Item;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
		public class Genero extends MovieClip {
		private var preview:MovieClip;
		private var corpo:Item;

		public function Genero() {
			var temp:MouseEvent;
			Masculino(temp);
		}
		private function placeItem(item:Item) {
			preview = MovieClip(MovieClip(stage.getChildAt(0)).getChildByName("char_preview"));
			if(corpo != null)
				preview.removeChild(corpo);
			corpo = item;
			preview.addChild(item);
		}
		public function Masculino(evt:MouseEvent) {
			var itemLoader = new ItemLoader();
			itemLoader.addUrl("shinobi_ex/modelo_corpo_masculino.swf");
			itemLoader.Load(placeItem);
		}
		public function Feminino(evt:MouseEvent) {
			var itemLoader = new ItemLoader();
			itemLoader.addUrl("shinobi_ex/modelo_corpo_feminino.swf");
			itemLoader.Load(placeItem);
		}
	}
}

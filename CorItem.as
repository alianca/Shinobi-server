package  {
	import flash.display.*;
	import flash.geom.ColorTransform;
	
	public class CorItem extends Sprite{
		public var cor:uint;
		
		public function CorItem(novaCor:uint) {
			cor = novaCor;
			changeColor(novaCor);
			width=30;
			height=30;
		}
		public function changeColor(novaCor:uint):void
		{
			var corT:ColorTransform = transform.colorTransform;
			corT.color = novaCor;
			transform.colorTransform = corT;
		}

	}
	
}

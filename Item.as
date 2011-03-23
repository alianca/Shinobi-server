package  {
	import flash.display.*;
	import flash.events.*;
	import flash.geom.ColorTransform;
	import fl.motion.Color;
	import flash.net.URLRequest;
	
	public class Item extends MovieClip
	{
		private var cor:MovieClip;
		private var url:String;
		
		public function Item(endereco:String)
		{
			super();
			url = endereco;
			cor=null;
		}
		public function addMov(mov:MovieClip):void
		{
			cor = mov.cor_ins;
		}
		public function changeColor(novaCor:uint):void
		{
			//trace(MovieClip(this.getChildAt(0)).getChildByName("cor_ins"));
			//var obj:DisplayObject = MovieClip(this.getChildAt(0)).getChildByName("cor_ins")
			var corT:ColorTransform = cor.transform.colorTransform;
			corT.color = novaCor;
			cor.transform.colorTransform = corT;
		}
		public function getUrl():String
		{
			return url;
		}
	}
	
}

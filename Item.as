package  {
	import flash.display.*;
	import flash.events.*;
	import flash.geom.ColorTransform;
	import fl.motion.Color;
	import flash.net.URLRequest;
	
	public class Item extends MovieClip
	{
		private var cores:Array = [];
		private var url:String;
		
		public function Item(endereco:String)
		{
			super();
			url = endereco;
		}
		public function addColor(cor:uint):void
		{
			cores.push(cor);
		}
		public function getColors():Array
		{
			return cores;
		}
		public function getColor(numColor:uint):uint
		{
			return cores[numColor];
		}
		public function getNumColors():uint
		{
			return cores.size();
		}
		public function changeColor(numColor:uint):void
		{
			var cor:ColorTransform = transform.colorTransform;
			cor.color = cores[numColor];
			transform.colorTransform = cor;
		}
		public function getUrl():String
		{
			return url;
		}
	}
	
}

// 1.创建场景(scene)
var scene = new THREE.Scene();

// 2.添加网格模型(mesh)
var geometry = new THREE.BoxGeometry(100,100,100); // 创建几何模型:立方体
var material = new THREE.MeshLambertMaterial({color:0xfff0000}); // 创建材质
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // 把Mesh对象加入到场景中

// 3.添加灯光(light)
var light = new THREE.PointLight(0xffffff);
light.position.set(300,400,200);
scene.add(light);

scene.add(new THREE.AmbientLight(0x333333)); // 加入一个新建的环境光，让整个场景的背面不会显得特别黑。

// 4.添加相机(camera)
var camera = new THREE.PerspectiveCamera(40, 800/600, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

// 5.创建渲染器(renderer)
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.body.appendChild(renderer.domElement);

// 6.渲染(render)
// 封装渲染函数
function render() {
	renderer.render(scene, camera);
}

render(); // 刚开始的时候就让它渲染一次，这样默认就不会是黑的了。

// 添加相机控制
var controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);
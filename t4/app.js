// 创建场景(scene)
var scene = new THREE.Scene();

// 加载OBJ模型到场景
var mtlLoader = new THREE.MTLLoader();
// 首先使用MTLLoader加载WaltHead.mtl材料文件
mtlLoader.load('WaltHead.mtl', function(materials) {

    materials.preload();
    var loader = new THREE.OBJLoader();
    // 然后把该材料设置给一个OBJLoader对象
    loader.setMaterials(materials);
    loader.load('WaltHead.obj', function (wolverine){
        // 回调函数里面返回一个加载成功的模型对象。
        // wolverine.scale.set(0.5,0.5,0.5);
        wolverine.position.y = 50;
        scene.add(wolverine);
    });

});

// 加入天空盒
// 参考webgl_materials_cubemap_balls_reflection.html
scene.background = new THREE.CubeTextureLoader()
    .setPath( './pisa/' )
    .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );

// 加纹理：贴图
// THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.
function loadImgTexture(){
    var loader = new THREE.TextureLoader();
    loader.load('crate.jpg',function(texture){
        var geometry = new THREE.BoxGeometry(100,100,100); // 创建几何模型:立方体
        // 创建材质
        // 把颜色变成纯白色，这样贴图能更好显示出来
        var material = new THREE.MeshBasicMaterial({color:0xffffff,map:texture});
        // 添加网格模型(mesh)
        var mesh = new THREE.Mesh(geometry,material);
        scene.add(mesh);// 把Mesh对象加入到场景中
    })
}

loadImgTexture();


// 3.添加灯光(light)
var light = new THREE.PointLight(0xffffff);
light.position.set(300,400,200);
scene.add(light);

scene.add(new THREE.AmbientLight(0x333333)); // 加入一个新建的环境光，让整个场景的背面不会显得特别黑。

// 4.添加相机(camera)
var camera = new THREE.PerspectiveCamera(40, 800/600, 1, 1000);
camera.position.set(300, 300, 300);
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

// 动画一般都是通过这样一种方式来完成的
function animate() {
    requestAnimationFrame(animate); // 每一帧执行一次，解决外部加载OBJ的异步问题。
    render();
}

animate();

// 添加相机控制
var controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);
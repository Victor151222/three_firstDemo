### 加载外部OBJ模型

1. 引入OBJ模型加载库


2. 加载OBJ模型到场景
3. 加载带材质的OBJ模型
- 在最新的three.js版本(r78)中，以前的OBJMTLLoader类已废弃。
  
  现在要加载OBJ和MTL文件，需要结合OBJLoader和MTLLoader两个类来实现，这也提供了操作的灵活性。
  
  首先使用MTLLoader加载WaltHead.mtl材料文件，然后把该材料设置给一个OBJLoader对象，以便在加载obj模型的时候进行应用。


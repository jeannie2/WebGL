var camera, scene, renderer, controls;
var geometry, material, mesh;

var camera, scene, renderer, controls;
var geometry, material, mesh;

function init() {
	scene = new THREE.Scene();
	var width = window.innerWidth;
	var height = window.innerHeight;

	camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
	camera.position.set(0, 200, 700); 
	scene.add(camera);

	
	var light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(1, 1, 1); // x, y, z
	scene.add(light);

	var spotlight = new THREE.SpotLight(0xFF9900);
	spotlight.position.set(0, 600, 0);
	spotlight.shadowDarkness = 0.5;
	spotlight.intensity = 2;
	spotlight.castShadow = true; 
	scene.add(spotlight);
	
	var objectTexture = THREE.ImageUtils.loadTexture('images/gold.jpg');
	
	material = new THREE.MeshLambertMaterial({map: objectTexture});
	geometry = new THREE.SphereGeometry(80, 50, 50);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.y = 100;
	mesh.castShadow = true;
	scene.add(mesh);
	
	//load json
	var loader = new THREE.JSONLoader();
	//just loader part =alwaus funciton geometry? + material line
	loader.load("new.json", function(geometry) {
		material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
		customshape = new THREE.Mesh(geometry, material);  //need this
		customshape.scale.set(30, 30, 30);
		customshape.position.y = 50;
		scene.add(customshape);
	});    
	
	var planeTexture = THREE.ImageUtils.loadTexture('images/metal.jpg');
	
	//plane geometry
	planeGeometry = new THREE.PlaneGeometry(700, 700, 10, 10);
	planeMaterial = new THREE.MeshLambertMaterial({map: planeTexture, side: THREE.DoubleSide});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = Math.PI / -2;
	plane.receiveShadow = true;
	scene.add(plane);

	var materialArray = [];

	var xpos = THREE.ImageUtils.loadTexture('images/posx.jpg');
	materialArray.push(new THREE.MeshBasicMaterial({map: xpos}));

	var xneg = THREE.ImageUtils.loadTexture('images/negx.jpg');
	materialArray.push(new THREE.MeshBasicMaterial({map: xneg}));

	var ypos = THREE.ImageUtils.loadTexture('images/posy.jpg');
	materialArray.push(new THREE.MeshBasicMaterial({map: ypos}));

	var yneg = THREE.ImageUtils.loadTexture('images/negy.jpg');
	materialArray.push(new THREE.MeshBasicMaterial({map: yneg}));

	var zpos = THREE.ImageUtils.loadTexture('images/posz.jpg');
	materialArray.push(new THREE.MeshBasicMaterial({map: zpos}));

	var zneg = THREE.ImageUtils.loadTexture('images/negz.jpg');
	materialArray.push(new THREE.MeshBasicMaterial({map: zneg}));

	for (var i = 0; i < 6; i++) {
		materialArray[i].side = THREE.BackSide; // set each image to backside
	}

	var skyboxMaterial = new THREE.MeshFaceMaterial(materialArray);
	var skyboxGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
	var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
	scene.add(skybox);

	renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
	renderer.setSize(width, height);
	renderer.shadowMapEnabled = true;
	
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);

	mesh.rotation.y += 0.1;  
	mesh.rotation.x += 0.1;

	renderer.render(scene, camera); 
	controls.update();
}

function windowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix(); 
	renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();

window.addEventListener('resize', windowResize);
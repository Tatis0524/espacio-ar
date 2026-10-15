// Datos de ExploraAR: categorías educativas, items y mini reto.
// Regla del proyecto: nunca se inventan URLs de modelos. Cada item con `model: null`
// es un "modelo pendiente" y está documentado en docs/EXPLORA.md.
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

const KHronosBase = 'https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models';

export const exploraCategories = [
  {
    id: 'ciencia',
    name: 'Ciencia en 3D',
    glyph: '🔬',
    tint: '#8FA97E',
    description: 'Cuerpo humano, materia y fenómenos naturales para explorar de cerca.',
  },
  {
    id: 'universo',
    name: 'Universo AR',
    glyph: '🪐',
    tint: '#6B7FA8',
    description: 'Planetas, satélites y la exploración espacial con modelos y fichas sencillas.',
  },
  {
    id: 'historia',
    name: 'Historia y cultura',
    glyph: '🏺',
    tint: '#C08A5E',
    description: 'Objetos para viajar al pasado. Las reconstrucciones digitales se identifican como tales.',
  },
  {
    id: 'naturaleza',
    name: 'Naturaleza y animales',
    glyph: '🌿',
    tint: '#7FA07A',
    description: 'Fauna y flora en 3D para estudiar sus características y curiosidades.',
  },
];

export const exploraItems = [
  /* ---------------------------- CIENCIA EN 3D ---------------------------- */
  {
    id: 'corazon-humano',
    category: 'ciencia',
    name: 'Corazón humano',
    tagline: 'El músculo que trabaja sin descanso',
    description:
      'El corazón es un músculo del tamaño de un puño que bombea sangre —y con ella oxígeno— a todo el cuerpo a través de vasos sanguíneos.',
    curiosities: [
      'Tiene cuatro cámaras: dos aurículas y dos ventrículos.',
      'Late unas 100.000 veces al día sin que se lo pidamos.',
      'En un día bombea miles de litros de sangre por todo el cuerpo.',
    ],
    visual: { glyph: '🫀', tint: '#b36b6b' },
    featured: false,
    model: null,
  },
  {
    id: 'esqueleto-humano',
    category: 'ciencia',
    name: 'Esqueleto humano',
    tagline: 'La estructura interna que nos sostiene',
    description:
      'El esqueleto de un adulto tiene alrededor de 206 huesos que protegen los órganos, dan forma al cuerpo y permiten el movimiento junto a los músculos y las articulaciones.',
    curiosities: [
      'Los huesos están vivos: se renuevan a lo largo de la vida.',
      'El hueso más pequeño es el estribo, dentro del oído medio.',
      'Al nacer tenemos muchos más huesos que al ser adultos: varios se fusionan al crecer.',
    ],
    visual: { glyph: '🦴', tint: '#a99f8b' },
    featured: false,
    model: null,
  },
  {
    id: 'cerebro',
    category: 'ciencia',
    name: 'Cerebro humano',
    tagline: 'El centro de control del cuerpo',
    description:
      'El cerebro, junto con la médula espinal, forma el sistema nervioso central: procesa lo que sentimos, controla el movimiento y alberga el pensamiento y la memoria.',
    curiosities: [
      'Pesa alrededor de 1,3 a 1,4 kilogramos en un adulto.',
      'Usa cerca del 20% de la energía que gasta el cuerpo.',
      'Está formado por miles de millones de neuronas conectadas entre sí.',
    ],
    visual: { glyph: '🧠', tint: '#c98a92' },
    featured: false,
    model: null,
  },
  {
    id: 'volcan',
    category: 'ciencia',
    name: 'Volcán',
    tagline: 'Una ventana al interior de la Tierra',
    description:
      'Un volcán es una abertura de la corteza terrestre por donde salen materiales del interior del planeta: magma, gases y ceniza. Cuando el magma llega a la superficie se llama lava.',
    curiosities: [
      'El Cinturón de Fuego del Pacífico concentra gran parte de los volcanes activos del mundo.',
      'El Nevado del Ruiz, en Colombia, es uno de los volcanes activos más estudiados del país.',
      'No todos los volcanes son iguales: hay escudos, estratovolcanes y calderas gigantes.',
    ],
    visual: { glyph: '🌋', tint: '#a8624e' },
    featured: false,
    model: null,
  },
  {
    id: 'ambar-mosquito',
    category: 'ciencia',
    name: 'Mosquito atrapado en ámbar',
    tagline: 'Una cápsula del tiempo de resina fósil',
    description:
      'El ámbar es resina de árboles que se endureció con el tiempo. A veces atrapó insectos enteros, que quedaron conservados casi intactos. Este modelo digital muestra el efecto translúcido del ámbar con refracción en tiempo real.',
    curiosities: [
      'El ámbar es resina fósil: no es una piedra ni un mineral.',
      'Muchos insectos hallados en ámbar tienen millones de años.',
      'La transparencia del ámbar se logra con efectos especiales del formato glTF (transmisión y volumen).',
    ],
    visual: { glyph: '🦟', tint: '#c9a35b' },
    featured: false,
    model: null,
    modelNote:
      'El modelo de Khronos «MosquitoInAmber» existe y es CC BY 4.0, pero pesa 23 MB: demasiado para una web móvil. Pendiente optimizarlo (Draco + texturas menores) antes de publicarlo aquí.',
  },
  {
    id: 'set-quimica',
    category: 'ciencia',
    name: 'Set de laboratorio de química',
    tagline: 'Matraces y tubos para experimentar',
    description:
      'Un montaje de laboratorio con matraces, tubos de ensayo y sustancias de colores. La química estudia qué está hecho la materia y cómo se transforma: cada sustancia que ves es una combinación de elementos.',
    curiosities: [
      'El matraz Erlenmeyer debe su nombre al químico alemán Emil Erlenmeyer (1860).',
      'Los tubos de ensayo permiten calentar pequeñas cantidades de sustancia con seguridad.',
      'El color de una solución puede indicar qué metal o compuesto contiene (por ejemplo, el cobre da tonos azules o verdes).',
    ],
    visual: { glyph: '⚗️', tint: '#7f9e8c' },
    featured: true,
    model: {
      src: asset('models/explora/chemistry_set/chemistry_set_1k.gltf'),
      alt: 'Modelo 3D de un set de laboratorio de química con matraces y tubos',
      license: 'CC0 (dominio público)',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es',
      source: 'Poly Haven (set de química, texturas 1K)',
      sourceUrl: 'https://polyhaven.com/a/chemistry_set',
      attribution: 'Modelo de Poly Haven (CC0)',
    },
  },
  {
    id: 'microscopio-antiguo',
    category: 'ciencia',
    name: 'Microscopio antiguo',
    tagline: 'La herramienta que abrió mundos invisibles',
    description:
      'El microscopio amplía objetos demasiado pequeños para el ojo humano. Con él se descubrieron las células en el siglo XVII y, más tarde, los microorganismos. Este modelo representa un microscopio de estilo antiguo.',
    curiosities: [
      'Robert Hooke publicó en 1665 el libro «Micrographia», con dibujos de lo que vio al microscopio.',
      'Hooke usó la palabra "célula" al observar corcho, por la semejanza con celdas.',
      'Hoy existen microscopios electrónicos que permiten ver estructuras miles de veces más pequeñas.',
    ],
    visual: { glyph: '🔬', tint: '#8a8f7a' },
    featured: false,
    reconstruction: true,
    model: {
      src: asset('models/explora/vintage_microscope/vintage_microscope_1k.gltf'),
      alt: 'Modelo 3D de un microscopio antiguo sobre una base de madera',
      license: 'CC0 (dominio público)',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es',
      source: 'Poly Haven (microscopio vintage, texturas 1K)',
      sourceUrl: 'https://polyhaven.com/a/vintage_microscope',
      attribution: 'Modelo de Poly Haven (CC0)',
    },
  },

  /* ----------------------------- UNIVERSO AR ----------------------------- */
  {
    id: 'tierra',
    category: 'universo',
    name: 'La Tierra',
    tagline: 'El único planeta conocido con vida',
    description:
      'Nuestro hogar: un planeta rocoso con agua líquida en la superficie y una atmósfera rica en nitrógeno y oxígeno que protege la vida. Cerca del 71% de su superficie está cubierta por agua.',
    curiosities: [
      'La Luna ayuda a estabilizar el inclinación del eje de la Tierra, y con ella las estaciones.',
      'La capa de ozono filtra gran parte de la radiación ultravioleta del Sol.',
      'Desde el espacio, la Tierra se ve azul por el agua de sus océanos.',
    ],
    visual: { glyph: '🌍', tint: '#5b84a8' },
    featured: false,
    model: null,
  },
  {
    id: 'luna',
    category: 'universo',
    name: 'La Luna',
    tagline: 'El satélite natural de la Tierra',
    description:
      'La Luna gira alrededor de la Tierra a unos 384.000 kilómetros de distancia. No tiene aire ni agua líquida en la superficie, y su gravedad es unas seis veces menor que la terrestre.',
    curiosities: [
      'Sin atmósfera, las huellas de las misiones Apollo pueden durar millones de años.',
      'La Luna provoca las mareas de los océanos terrestres.',
      'Siempre muestra la misma cara a la Tierra porque tarda lo mismo en girar sobre su eje que en orbitarnos.',
    ],
    visual: { glyph: '🌙', tint: '#9aa3b5' },
    featured: false,
    model: null,
  },
  {
    id: 'marte',
    category: 'universo',
    name: 'Marte',
    tagline: 'El planeta rojo',
    description:
      'Marte es un planeta rocoso, frío y con una atmósfera muy delgada. Su paisaje se ve rojizo por el óxido de hierro (herrumbre) presente en su polvo.',
    curiosities: [
      'Alberga al volcan más grande del sistema solar: el Olympus Mons.',
      'Un día en Marte (un "sol") dura poco más de 24 horas y media, muy parecido a un día en la Tierra.',
      'Varias misiones robóticas, como Curiosity y Perseverance, exploran su superficie.',
    ],
    visual: { glyph: '🔴', tint: '#b56a4d' },
    featured: false,
    model: null,
  },
  {
    id: 'sistema-solar',
    category: 'universo',
    name: 'Sistema solar',
    tagline: 'Nuestro barrio cósmico',
    description:
      'El sistema solar está formado por el Sol y todo lo que gira a su alrededor: ocho planetas, sus lunas, asteroides y cometas. Se formó hace unos 4.600 millones de años.',
    curiosities: [
      'Júpiter es el planeta más grande; podría contener a todos los demás dentro de él.',
      'Entre Marte y Júpiter se encuentra el cinturón de asteroides.',
      'Desde 2006 se reconoce que son ocho planetas: Plutón fue reclasificado como planeta enano.',
    ],
    visual: { glyph: '🪐', tint: '#8f7fa8' },
    featured: false,
    model: null,
  },
  {
    id: 'ingenuity',
    category: 'universo',
    name: 'Ingenuity: el helicóptero de Marte',
    tagline: 'La primera máquina que voló en otro planeta',
    description:
      'Ingenuity viajó con el rover Perseverance a Marte. El 18 de abril de 2021 realizó el primer vuelo controlado de una aeronave en otro planeta: despegó, se mantuvo en el aire y aterrizó usando solo sus propios rotors en la atmósfera muy fina de Marte.',
    curiosities: [
      'Pesaba alrededor de 1,8 kilogramos y tenía dos rotores que giraban muchísimo más rápido que los de un helicóptero terrestre.',
      'Completó decenas de vuelos de prueba antes de que la misión terminara.',
      'Demostró que la aviación en otros planetas es posible, algo clave para futuras misiones.',
    ],
    visual: { glyph: '🚁', tint: '#7d8ba3' },
    featured: true,
    model: {
      src: asset('models/explora/Ingenuity.glb'),
      alt: 'Modelo 3D del helicóptero Ingenuity de la misión Mars 2020',
      license: 'Apache-2.0 (repositorio CesiumJS) · Diseño de NASA/JPL-Caltech',
      licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0',
      source: 'CesiumGS/cesium (datos de NASA/JPL)',
      sourceUrl: 'https://github.com/CesiumGS/cesium/tree/main/Apps/SampleData/models/Mars',
      attribution: 'Modelo incluido en CesiumJS (Apache-2.0); el helicóptero Ingenuity es de NASA/JPL-Caltech',
    },
  },

  /* ------------------------- HISTORIA Y CULTURA -------------------------- */
  {
    id: 'farol-antiguo',
    category: 'historia',
    name: 'Farol antiguo de calle',
    tagline: 'La luz de las calles antes de la electricidad',
    description:
      'Durante siglos, las ciudades se iluminaban con quemas de aceite, sebo o gas. Los faroles de calle eran encendidos a mano cada anochecer y apagados al amanecer. Este modelo representa un farol de madera y metal de estilo histórico.',
    curiosities: [
      'Las ciudades europeas pasaron del aceite al gas a comienzos del siglo XIX.',
      'El alumbrado eléctrico llegó a finales del siglo XIX y cambió por completo la vida nocturna.',
      'Los "faroleros" eran los encargados de encender y apagar los faroles de un barrio.',
    ],
    visual: { glyph: '🏮', tint: '#c99a5b' },
    featured: true,
    reconstruction: true,
    model: {
      src: asset('models/explora/Lantern.glb'),
      alt: 'Modelo 3D de un farol antiguo de madera y metal',
      license: 'CC0 (dominio público)',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es',
      source: 'Khronos glTF Sample Assets',
      sourceUrl: `${KHronosBase}/Lantern`,
      attribution: 'Modelo de Microsoft/sbtron (CC0); compresión Draco de Frank Galligan (CC0)',
    },
  },
  {
    id: 'camara-antigua',
    category: 'historia',
    name: 'Cámara antigua con trípode',
    tagline: 'Cuando fotografiar tomaba minutos',
    description:
      'Las primeras cámaras fotográficas eran cajas de madera con lentes y un obturador manual. En la época del daguerrotipo, exponer una fotografía podía llevar varios minutos: la gente tenía que posar quietísima.',
    curiosities: [
      'El daguerrotipo se presentó en 1839 y fue uno de los primeros procesos fotográficos populares.',
      'Después vinieron las placas de vidrio y, más tarde, la película flexible.',
      'La palabra "cámara" viene de la "cámara oscura", una habitación oscura con un agujero que proyecta la imagen del exterior.',
    ],
    visual: { glyph: '📷', tint: '#8a7a63' },
    featured: false,
    reconstruction: true,
    model: null,
    modelNote:
      'El modelo de Khronos «AntiqueCamera» es CC0, pero pesa 16,7 MB: demasiado para una web móvil. Pendiente optimizarlo antes de publicarlo aquí.',
  },
  {
    id: 'corse-historico',
    category: 'historia',
    name: 'Corsé del siglo XIX',
    tagline: 'Un objeto cultural de la historia de la moda',
    description:
      'El corsé fue una prenda interior usada durante siglos para moldear la silueta. Se estudiaba y discutía ya en su época por la presión que ejercía sobre el cuerpo. Este modelo digital es una representación ilustrativa, no una pieza histórica original.',
    curiosities: [
      'En los siglos XVIII y XIX muchos corsés llevaban varillas de "hueso de ballena" o acero.',
      'Los corsés también se usaban por hombres, por ejemplo en uniformes militares.',
      'Hoy los corsés originales se conservan en museos de moda como objetos de estudio cultural.',
    ],
    visual: { glyph: '👗', tint: '#a8798a' },
    featured: false,
    reconstruction: true,
    model: null,
    modelNote:
      'El modelo de Khronos «Corset» es CC0, pero pesa 12,9 MB: demasiado para una web móvil. Pendiente optimizarlo antes de publicarlo aquí.',
  },
  {
    id: 'canon-colonial',
    category: 'historia',
    name: 'Cañón de época colonial',
    tagline: 'Defensas de los puertos del Nuevo Reino',
    description:
      'Los puertos coloniales de América, como Cartagena de Indias, se protegían con murallas y baterías de cañones de bronce y hierro. Este modelo digital es una representación ilustrativa de un cañón de ruedas de esa época, no un hallazgo arqueológico.',
    curiosities: [
      'Cartagena de Indias fue una de las ciudades más fortificadas de América y hoy es Patrimonio de la Humanidad.',
      'Los cañones se fundían en fundiciones europeas y se embarcaban hacia América.',
      'Con la pólvora, un cañón podía disparar bolas de metal a cientos de metros de distancia.',
    ],
    visual: { glyph: '🏰', tint: '#a08a5e' },
    featured: false,
    reconstruction: true,
    model: {
      src: asset('models/explora/cannon_01/cannon_01_1k.gltf'),
      alt: 'Modelo 3D de un cañón antiguo de ruedas de madera',
      license: 'CC0 (dominio público)',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es',
      source: 'Poly Haven (cañón, texturas 1K)',
      sourceUrl: 'https://polyhaven.com/a/cannon_01',
      attribution: 'Modelo de Poly Haven (CC0)',
    },
  },
  {
    id: 'balsa-muisca',
    category: 'historia',
    name: 'La Balsa Muisca',
    tagline: 'La pieza dorada detrás del mito de El Dorado',
    description:
      'La Balsa Muisca es una ofrenda de oro y tumbaga (una aleación de oro y cobre) hallada en 1969 cerca de Bogotá. Representa la ceremonia en la que un nuevo cacique era ungido en el Lago de Guatavita, cubierto de oro, mientras ofrendaba objetos a la laguna. Se conserva en el Museo del Oro del Banco de la República, en Bogotá.',
    curiosities: [
      'Es la pieza que dio origen al mito de El Dorado: "el hombre dorado".',
      'La tumbaga permite fundir a menor temperatura que el oro puro y tomar formas muy detalladas.',
      'Los muiscas no escribían: su historia se conoce por la arqueología y por los relatos de la época colonial.',
    ],
    visual: { glyph: '🛶', tint: '#c2a24d' },
    featured: false,
    notice:
      'Esta ficha describe una pieza auténtica del Museo del Oro (Banco de la República, Colombia). En ExploraAR NO hay una reproducción 3D de la Balsa Muisca: no existe un modelo digital con licencia libre, y no queremos mostrar una réplica inventada como si fuera la pieza real. Ficha informativa basada en la información pública del Museo del Oro.',
    source: 'Museo del Oro, Banco de la República (Colombia)',
    sourceUrl: 'https://www.museodeloro.gov.co/',
    model: null,
  },

  /* ----------------------- NATURALEZA Y ANIMALES ------------------------- */
  {
    id: 'zorro',
    category: 'naturaleza',
    name: 'Zorro rojo',
    tagline: 'Un depredador ágil y curioso',
    description:
      'El zorro rojo es un mamífero carnívoro de la familia de los cánidos, muy adaptable: vive en bosques, montañas y hasta en ciudades. El modelo de ExploraAR incluye animaciones de observación, caminata y carrera.',
    curiosities: [
      'Su pelaje cambia con las estaciones: más grueso y claro en invierno.',
      'Usa el oído para localizar presas escondidas bajo la nieve o la hierba.',
      'Es un animal solitario y territorial, con marcas de olor en su territorio.',
    ],
    visual: { glyph: '🦊', tint: '#c97f4d' },
    featured: true,
    model: {
      src: asset('models/explora/Fox.glb'),
      alt: 'Modelo 3D animado de un zorro rojo',
      license: 'CC0 + CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/deed.es',
      source: 'Khronos glTF Sample Assets',
      sourceUrl: `${KHronosBase}/Fox`,
      attribution:
        'Modelo de PixelMannen (CC0); rigging y animación de tomkranis (CC BY 4.0); conversión a glTF de @AsoboStudio y @scurest (CC BY 4.0)',
    },
  },
  {
    id: 'pez-barramundi',
    category: 'naturaleza',
    name: 'Pez barramundi',
    tagline: 'El pez que puede cambiar de sexo',
    description:
      'El barramundi es un pez de agua dulce y salobre nativo de Australia y del sudeste asiático. Es apreciado por su carne y es un excelente nadador que remonta ríos.',
    curiosities: [
      'Muchos barramundis nacen machos y se convierten en hembras al crecer (un fenómeno llamado protandria).',
      'Puede vivir en agua dulce y en agua salada, y migra entre ambas.',
      'Su nombre viene de una palabra aborigen australiana que significa "pez de escama grande".',
    ],
    visual: { glyph: '🐟', tint: '#6f97a8' },
    featured: false,
    model: null,
    modelNote:
      'El modelo de Khronos «BarramundiFish» es CC0, pero pesa 11,9 MB y el CDN no logró entregarlo de forma estable: pendiente optimizar o servir desde otra fuente.',
  },
  {
    id: 'flores-jarron',
    category: 'naturaleza',
    name: 'Flores en jarrón de vidrio',
    tagline: 'La parte reproductora de las plantas',
    description:
      'Las flores son las estructuras con las que muchas plantas se reproducen: producen semillas tras la polinización. Observa sus partes: pétalos de colores, tallos y el jarrón de vidrio transparente (una demostración de materiales del formato glTF).',
    curiosities: [
      'Los pétalos de colores atraen a insectos y aves que polinizan la flor.',
      'El polen se forma en los estambres y llega al pistilo para fecundar el óvulo.',
      'El vidrio del jarrón usa "transmisión" y "volumen": efectos del formato glTF que simulan el paso de la luz.',
    ],
    visual: { glyph: '🌸', tint: '#c98aa8' },
    featured: false,
    model: {
      src: asset('models/explora/GlassVaseFlowers.glb'),
      alt: 'Modelo 3D de flores dentro de un jarrón de vidrio transparente',
      license: 'CC0 (dominio público)',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.es',
      source: 'Khronos glTF Sample Assets',
      sourceUrl: `${KHronosBase}/GlassVaseFlowers`,
      attribution: 'Jarrón de Eric Chadwick (CC0); flores de Rico Cilliers (CC0)',
    },
  },
  {
    id: 'planta-maceta',
    category: 'naturaleza',
    name: 'Planta en maceta',
    tagline: 'Hojas que fabrican alimento con luz',
    description:
      'Las hojas son los "paneles solares" de la planta: con la clorofila captan la luz del Sol y, con agua y dióxido de carbono, producen su alimento en un proceso llamado fotosíntesis.',
    curiosities: [
      'La fotosíntesis libera oxígeno: gran parte del oxígeno que respiramos viene de las plantas.',
      'En las hojas hay poros diminutos llamados estomas por donde entra y sale el aire.',
      'Las plantas inclinan sus hojas hacia la luz: se llama fototropismo.',
    ],
    visual: { glyph: '🪴', tint: '#6f9166' },
    featured: false,
    model: {
      src: asset('models/explora/DiffuseTransmissionPlant.glb'),
      alt: 'Modelo 3D de una planta verde en una maceta',
      license: 'CC BY 4.0 + CC0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/deed.es',
      source: 'Khronos glTF Sample Assets',
      sourceUrl: `${KHronosBase}/DiffuseTransmissionPlant`,
      attribution: 'Materiales y animación de Eric Chadwick (CC BY 4.0); original de Rico Cilliers (CC0)',
    },
  },
  {
    id: 'mariposa',
    category: 'naturaleza',
    name: 'Mariposa',
    tagline: 'Una transformación asombrosa',
    description:
      'Las mariposas sufren una metamorfosis completa: nacen como huevos, salen como orugas, se transforman en una crisálida y emergen como adultos con alas.',
    curiosities: [
      'Dentro de la crisálida, el cuerpo de la oruga se reorganiza casi por completo.',
      'Sus alas no son de tela: están formadas por miles de escamas diminutas.',
      'Muchas mariposas migra largas distancias; la monarca viaja miles de kilómetros cada año.',
    ],
    visual: { glyph: '🦋', tint: '#8f7bb5' },
    featured: false,
    model: null,
  },
  {
    id: 'tortuga',
    category: 'naturaleza',
    name: 'Tortuga',
    tagline: 'Una armadura que crece contigo',
    description:
      'Las tortugas son reptiles con caparazón: una estructura ósea unida a su esqueleto (costillas y columna) cubierta por placas córneas. Existen especies terrestres, de agua dulce y marinas.',
    curiosities: [
      'El caparazón forma parte del esqueleto: no se puede "salir" de él como las cangrejas de sus caparazones.',
      'Algunas tortugas viven más de 100 años.',
      'Las tortugas marinas orientan su viaje usando, entre otras cosas, el campo magnético de la Tierra.',
    ],
    visual: { glyph: '🐢', tint: '#7f9a66' },
    featured: false,
    model: null,
  },
];

/* ------------------------------ MINI RETO -------------------------------- */
// Respuestas verificables y aptas para estudiantes y público general.
export const quizQuestions = [
  {
    q: '¿Qué es la realidad aumentada?',
    options: [
      'Un mundo totalmente ficticio que reemplaza lo que ves',
      'Contenido digital superpuesto sobre el mundo real que ves por la cámara',
      'Una forma de realidad virtual que no necesita celular',
    ],
    answer: 1,
    feedback: 'La AR combina el entorno real (por la cámara) con objetos digitales colocados encima.',
  },
  {
    q: '¿Qué debe detectar el celular para colocar un objeto en el piso?',
    options: ['Una superficie o plano del entorno', 'La señal de WiFi', 'Solo el GPS'],
    answer: 0,
    feedback: 'El sistema (ARCore en Android, ARKit en iPhone) detecta planos del entorno —pisos o paredes— donde anclar el objeto.',
  },
  {
    q: '¿Qué órgano bombea la sangre por el cuerpo?',
    options: ['El pulmón', 'El hígado', 'El corazón'],
    answer: 2,
    feedback: 'El corazón es un músculo que bombea sangre a todo el cuerpo: late unas 100.000 veces al día.',
  },
  {
    q: '¿Cuál es el hueso más largo del cuerpo humano?',
    options: ['El fémur (del muslo)', 'La tibia (de la pierna)', 'El húmero (del brazo)'],
    answer: 0,
    feedback: 'El fémur, en el muslo, es el hueso más largo y fuerte del cuerpo adulto.',
  },
  {
    q: '¿Por qué se ve rojizo el paisaje de Marte?',
    options: [
      'Por nieve de dióxido de carbono',
      'Por óxido de hierro (herrumbre) en su polvo',
      'Por los reflejos de sus volcanes',
    ],
    answer: 1,
    feedback: 'El polvo de Marte tiene mucho óxido de hierro: la misma herrumbre que se forma en el hierro de la Tierra.',
  },
  {
    q: '¿Qué gas absorben las plantas para hacer fotosíntesis?',
    options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono'],
    answer: 2,
    feedback: 'Las plantas toman dióxido de carbono, agua y luz para fabricar su alimento, y liberan oxígeno.',
  },
  {
    q: '¿Por qué vemos brillar a la Luna?',
    options: [
      'Produce su propia luz, como el Sol',
      'Refleja la luz del Sol que le llega',
      'Quema gases en su superficie',
    ],
    answer: 1,
    feedback: 'La Luna no emite luz propia: refleja la luz del Sol. Por eso vemos sus fases según cómo la ilumina.',
  },
];

/* --------------------------------- Helpers -------------------------------- */
export const exploraCategoryIds = exploraCategories.map((c) => c.id);
export const getExploraItem = (id) => exploraItems.find((i) => i.id === id);
export const getExploraCategory = (id) => exploraCategories.find((c) => c.id === id);
export const exploraItemsWithModel = exploraItems.filter((i) => i.model);

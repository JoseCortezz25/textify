import { GenericPart, TONE_DOCS } from "./types";

interface Placeholder {
  id: number;
  placeholder: string;
}

export const placeholderExamples: Placeholder[] = [
  {
    id: 1,
    placeholder: 'la vida de Leonardo Da Vinci'
  },
  {
    id: 2,
    placeholder: 'la historia de la pizza'
  },
  {
    id: 3,
    placeholder: 'el origen de la vida'
  },
  {
    id: 4,
    placeholder: 'la historia de la cerveza'
  },
  {
    id: 5,
    placeholder: 'innovaciones tecnológicas'
  },
  {
    id: 6,
    placeholder: 'felicitar a mi compañera de trabajo Emily por su cumpleaños'
  },
  {
    id: 7,
    placeholder: 'carta de presentación para un puesto de marketing'
  },
  {
    id: 8,
    placeholder: 'sinopsis de Orgullo y Prejuicio'
  },
  {
    id: 9,
    placeholder: 'email de seguimiento para un cliente'
  },
  {
    id: 10,
    placeholder: 'ideas para el próximo proyecto'
  }
];

const informalParts: GenericPart = [
  { text: "Act like a grammatical and literary expert. Your mission is to convert any text into texts with a INFORMAL tone. To do this, modify its structure, tone, words, wording, and other grammatical elements in order to achieve this goal. Pay attention to the details and relationship of the words, as well as to the meaning so that the generated text keeps the same essence of the original text. The casual text should not be conversational." },
  { text: "input: Me dirijo a usted para comunicarle que lamentablemente este verano no será posible nuestra visita anual, como suele ser la costumbre, debido a que nuestra abuela Marisa ha enfermado. Por ende, hemos decidido permanecer en Madrid para brindarle cuidados y compañía, procurando que no se sienta sola. Nos entristece profundamente esta situación, especialmente a los niños, quienes siempre disfrutan enormemente su estancia en su hogar. ¿Cómo se encuentran ustedes? ¿Ha sido un invierno con muchas nevadas en su zona?" },
  { text: "output: Te escribo para decirte que finalmente este verano no vamos a poder ir a visitarte como hacemos todos los años porque nuestra abuela Marisa se ha puesto enferma y vamos a quedarnos en Madrid a cuidarla entre todos para que no se sienta sola. Nos da mucha pena, sobre todo a los niños que siempre disfrutan muchísimo en tu casa. ¿Cómo estáis vosotros?, ¿ ha nevado mucho por allí este invierno?" },
  { text: "input: Me sentí extremadamente afortunado al descubrir un restaurante de calidad excepcional en el centro de París: su ambiente acogedor, la exquisitez de sus platos y la cortesía de su personal lo convirtieron en el punto destacado de mi viaje." },
  { text: "output: No podía creerme mi suerte cuando me topé con una joya oculta de restaurante en el corazón de París: ¡el ambiente acogedor, la comida deliciosa y la amabilidad del personal lo convirtieron en lo mejor de mi viaje!" },
  { text: "input: Estudios recientes han indicado una correlación entre el aumento de la frecuencia y la gravedad de las catástrofes naturales, como huracanes e incendios forestales, y el aumento de las temperaturas globales provocado por las actividades humanas." },
  { text: "output: Parece que últimamente hay más desastres naturales como huracanes y incendios forestales, ¿no? Dicen que es por el calentamiento global causado por las cosas que hace la gente." },
  { text: "input: La planeación es la etapa en la que se desarrollan todas las especificaciones detalladas, esquemas, programas y otros planes. Las partes del proyecto, a menudo denominadas paquetes de esfuerzo, se descomponen y se asignan trabajos individuales y el procedimiento de realización queda claramente definido." },
  { text: "output: La fase de planificación constituye el momento en el cual se elaboran todas las especificaciones detalladas, diagramas, cronogramas y otros planes pertinentes. Los componentes del proyecto, frecuentemente referidos como paquetes de trabajo, son desglosados y se asignan tareas individuales, estableciendo claramente el procedimiento de ejecución." },
  { text: "input: El clima en esta localidad está experimentando temperaturas elevadas." },
  { text: "output: Esta haciendo demasiado calor en esta ciudad" },
  { text: "input: Me sentí extremadamente afortunado al descubrir un restaurante de calidad excepcional en el centro de París: su ambiente acogedor, la exquisitez de sus platos y la cortesía de su personal lo convirtieron en el punto destacado de mi viaje." },
  { text: "output: No podía creerme mi suerte cuando me topé con una joya oculta de restaurante en el corazón de París: ¡el ambiente acogedor, la comida deliciosa y la amabilidad del personal lo convirtieron en lo mejor de mi viaje!\"" },
  { text: "input: Estimado interlocutor, me encuentro fatigado de las interacciones virtuales, ya sea a través de publicaciones en Twitter, mensajes directos o reacciones con el botón de corazón. Lo que realmente anhelo es establecer una conexión cara a cara. ¿Comprendes mi punto de vista? Si la dama está interesada, adelante, y si no lo está, aceptaré esa decisión. ¿Me sigues hasta ahora? Sin embargo, estoy cansado de esta incertidumbre, de esperar sin recibir una respuesta definitiva, de prolongar esta situación. Parece que ella simplemente está jugando conmigo." },
  { text: "output: Mano, yo ya me cansé de estar que si tuiteando, que si el DM, que si el corazoncito, qué va, yo lo que quiero es la cosa en vivo, ¿me entiendes? Si la muchacha quiere, pues pa’lante, y si no quiere, ni modo, ¿qué voy a hacer? ¿Me sigues? Pero no, ya está bueno del tira y encoge, de tenerlo a uno ahí, que si hoy no, que si mañana tampoco… ella como que me está vacilando nada más" },
  { text: "input: Pedrito, te recuerdo la importancia de adquirir los artículos que mencionamos previamente. Sería desafortunado que nuestros invitados llegaran y no tuviéramos todo preparado. Conoces la forma en que Miriam se pone, y sinceramente, no estoy de humor para lidiar con eso. Por lo tanto, te pido que no lo olvides. Saludos." },
  { text: "output: Pedrito, acuérdate de comprar las cosas que dijimos, no vaya a ser que lleguen los invitados y no tengamos todo listito,  ya sabes como se pone Miriam y de verdad que no ando con ganas, así que bueno, nada, acuérdate, besos" },
  { text: "input: Estimado amigo,Espero que te encuentres bien. Me preguntaba si estarías interesado en reunirnos mañana por la tarde en el parque para disfrutar del clima y pasar un rato agradable. Sería estupendo contar contigo para compartir algunas risas. ¿Qué opinas de la propuesta?" },
  { text: "output: Hey, ¿qué tal, amigo? ¿Cómo va todo? Estaba pensando que mañana en la tarde podríamos juntarnos en el parque, disfrutar del buen clima y tal vez echarnos unas risas. ¿Qué te parece la idea? ¡Sería genial contar contigo!" },
  { text: "input: Hola amigo. Espero que estés bien. Me gustaría invitarte cordialmente a mi residencia esta noche. He pensado en ordenar algunas pizzas, disfrutar de unas cervezas y ver algunas películas en Netflix. Personalmente, creo que sería un plan perfecto para culminar la semana. Espero ansiosamente tu respuesta." },
  { text: "output: Oye, ¿cómo estás? Espero que todo bien. ¿Te gustaría venir a mi casa esta noche? Estaba pensando en pedir unas pizzas, abrir un par de cervezas, y ver algunas películas en Netflix. No sé tú, pero suena como un plan perfecto para terminar la semana. ¡Espero tu respuesta!\"" },
  { text: "input: El servicio inicialmente se plantea como público objetivo la población con un rango de edad de 18 años sin prescindir a la población restante que dentro de su núcleo familiar cuenta con al menos una mascota. En lo que respecta al factor económico, el público objetivo a captar debe tener ingresos mayores a dos salarios mínimos mensuales, debido a que es esta la población que tiene mayor capacidad adquisitiva. Además, se tendrá en cuenta la población fuera de este rango económico mediante ofertas especiales para diferentes segmentos." },
  { text: "output: El servicio va dirigido principalmente a gente de 18 años para arriba, pero también a familias que tengan al menos una mascota. En cuanto a la plata, la idea es que los clientes ganen más de dos salarios mínimos al mes, ya que son los que tienen más poder adquisitivo. Pero ojo, que también habrá ofertas especiales para otros bolsillos." },
  { text: "input: Me dirijo a usted para invitarle a la graduación del curso 2021/2022 de la Facultad de Medicina de Granada. Esperamos su confirmación antes del evento." },
  { text: "output: ¿Entonces, parce? Te escribo para invitarte a la graduación de la Facultad de Medicina de Granada  promoción 2021/2022.  Porfa, escríbeme para confirmarme si vienes, gracias" }
];

const formalParts: GenericPart = [
  { text: "Act like a grammatical and literary expert. Your mission is to convert any text into texts with a FORMAL tone. To do this, modify its structure, tone, words, wording, and other grammatical elements in order to achieve this goal. Pay attention to the details and relationship of the words, as well as to the meaning so that the generated text keeps the same essence of the original text. The casual text should not be conversational." },
  { text: "input: Parece que últimamente hay más desastres naturales como huracanes y incendios forestales, ¿no? Dicen que es por el calentamiento global causado por las cosas que hace la gente." },
  { text: "output: Estudios recientes han indicado una correlación entre el aumento de la frecuencia y la gravedad de las catástrofes naturales, como huracanes e incendios forestales, y el aumento de las temperaturas globales provocado por las actividades humanas." },
  { text: "input: No podía creerme mi suerte cuando me topé con una joya oculta de restaurante en el corazón de París: ¡el ambiente acogedor, la comida deliciosa y la amabilidad del personal lo convirtieron en lo mejor de mi viaje!\"" },
  { text: "output: Me sentí extremadamente afortunado al descubrir un restaurante de calidad excepcional en el centro de París: su ambiente acogedor, la exquisitez de sus platos y la cortesía de su personal lo convirtieron en el punto destacado de mi viaje." },
  { text: "input: En Colombia, el gobierno ha estado trabajando en unas cosas del Ministerio de Tecnologías de la Información y las Comunicaciones para lidiar con los rollos de la cuarta revolución industrial. Están entrenando a la gente en software y todo eso para conseguir trabajo, pero aún así, hay muchos problemas en ese rollo por aquí." },
  { text: "output: En Colombia el Ministerio de Tecnologías de la Información y de las Comunicaciones, han desarrollado varias estrategias para enfrentar los desafíos de la cuarta revolución industrial, formando hombres y mujeres para suplir el mercado laboral en desarrollo de software, pero el país continúa presentando falencias en este campo" },
  { text: "input: Desde que empezó la pandemia, todo se ha vuelto más digital. Ahora, hay un montón de cosas que se hacen por internet en todas partes, y eso ha creado un mercado enorme que necesita cada vez más gente que sepa de desarrollo de software. Por eso, hay un montón de trabajos disponibles en áreas relacionadas con el desarrollo de software" },
  { text: "output: Desde la llegada de la pandemia se ha evidenciado un incremento en la digitalización mediante sistemas de información en las diferentes disciplinas, dando lugar a un enorme mercado requiriendo cada vez más enorme donde se necesitan personal capacitado en habilidades de desarrollo de software. Viéndose evidenciado en el incremento en ofertas laborales en disciplinas relacionadas con el desarrollo de software." },
  { text: "input: Te escribo para decirte que finalmente este verano no vamos a poder ir a visitarte como hacemos todos los años porque nuestra abuela Marisa se ha puesto enferma y vamos a quedarnos en Madrid a cuidarla entre todos para que no se sienta sola. Nos da mucha pena, sobre todo a los niños que siempre disfrutan muchísimo en tu casa. ¿Cómo estáis vosotros?, ¿ ha nevado mucho por allí este invierno?" },
  { text: "output: Me dirijo a usted para comunicarle que lamentablemente este verano no será posible nuestra visita anual, como suele ser la costumbre, debido a que nuestra abuela Marisa ha enfermado. Por ende, hemos decidido permanecer en Madrid para brindarle cuidados y compañía, procurando que no se sienta sola. Nos entristece profundamente esta situación, especialmente a los niños, quienes siempre disfrutan enormemente su estancia en su hogar. ¿Cómo se encuentran ustedes? ¿Ha sido un invierno con muchas nevadas en su zona?" },
  { text: "input: Gracias por aceptar nuestra oferta. ¡Bienvenido a [Nombre de la empresa]!¡Hoy es el primer día del resto de tu vida (profesional)! Estamos muy contentos de que quieras trabajar con nosotros y estamos deseando que te unas a nuestra pequeña comunidad." },
  { text: "output: ¡Gracias por aceptar nuestra oferta! ¡Bienvenido a [Nombre de la empresa]! Hoy marca el comienzo de una nueva etapa en tu carrera profesional. Estamos emocionados de tenerte en nuestro equipo y ansiosos por verte formar parte de nuestra comunidad." },
  { text: "input: Hoy quiero compartir con ustedes un breve pero significativo momento: un mensaje rápido a mamá. A veces, en nuestra vida ocupada, olvidamos lo importante que es mantenernos conectados con nuestros seres queridos. En esta entrada, les mostraré cómo un simple mensaje puede alegrar el día de mamá y fortalecer nuestros lazos familiares. Sigue leyendo para descubrir cómo un pequeño gesto puede marcar la diferencia." },
  { text: "output: Quiero contarles un momento breve pero especial: un mensaje rápido a mamá. A veces, con la vida tan agitada, nos olvidamos de lo crucial que es mantenernos conectados con nuestros seres queridos. En este post, les mostraré cómo un simple mensaje puede alegrar el día de mamá y fortalecer nuestros lazos familiares. Sigue leyendo para descubrir cómo un pequeño gesto puede hacer una gran diferencia." },
  { text: "input: Rosa está agotaba por todo el trabajo que le ha costado redecorar su tienda." },
  { text: "output: Rosa se encuentra agotada debido al arduo trabajo que ha realizado para remodelar su establecimiento comercial." },
  { text: "input: Quería decirte que me encantó tu actuación en el Primavera Sound. ¡Aún se me ponen los pelos de punta! Ojalá leas mi mensaje y sepas que soy tu fan número 1." },
  { text: "output: Me dirijo a usted para expresarle mi profunda admiración por su excepcional actuación en el festival Primavera Sound. Su dominio del escenario y su interpretación cautivadora me dejaron una impresión imborrable.\n\nEsperanzado de que este mensaje llegue a sus manos, le aseguro que soy su admirador más ferviente. El recuerdo de su actuación suscita en mí una emoción inefable cada vez que viene a mi mente." }
];

const objetiveParts: GenericPart = [
  { text: "You are a grammar expert and your task is to rewrite the supplied text with a different tone. I am going to give you a text with an unknown tone, I need you to convert the text and modify it so that it has an OBJECTIVE tone. To do this, modify its structure, tone, words, wording and other grammatical elements in order to meet this objective. Pay attention to the details and relationship of the words, as well as the meaning so that the generated text retains the same essence of the original text. The casual text should not be conversational.\n\nTo create a text with an OBJECTIVE tone you should follow these instructions:\n* When we write to give information or facts without bias or personal opinions.\n* The construction of the text and its grammatical and stylistic resources aim to preserve a verifiable point of view.\n* Non-valorative adjectives (explanatory, demonstrative, etc.).\n* Verbs in the third person, impersonal, or first plural.\n* Most sentences appear in the indicative mood.\n* Generally, short sentences and little subordination are used.\n* Use of specific, technical or specialized lexicon.\n* Expository tone without opinions or reflections." },
  { text: "input: Es increíble cómo de bien trabajado está el aspecto mental del Bayer Leverkusen.\n\nEn 2024 llevan SEIS partidos ganados o empatados en el minuto 90 o después.\n\nY en muchos casos con más de un gol en el tiempo añadido (Qarabag, Hoffenheim).\n\nNo es suerte. Es no perder la calma y saber seguir tu plan hasta el último minuto." },
  { text: "output: El desempeño del Bayer Leverkusen en términos mentales resulta notable. Hasta el año 2024, han logrado mantenerse invictos en seis encuentros, ya sea ganando o empatando, después del minuto 90. En varios de estos casos, incluso han anotado más de un gol durante el tiempo añadido, como en los partidos contra Qarabag y Hoffenheim. Este éxito no puede atribuirse a la casualidad, sino más bien a la capacidad del equipo para conservar la compostura y ejecutar su estrategia hasta el último momento." },
  { text: "input: Compartimos los resultados de un avance a pequeña escala de Voice Engine, un modelo que utiliza texto y una única muestra de audio de 15 segundos para generar un habla natural muy parecida a la del hablante original." },
  { text: "output: Se presentan los resultados de una prueba piloto de Voice Engine, un modelo diseñado para producir un habla natural similar a la del hablante original utilizando únicamente un texto y una muestra de audio de 15 segundos." },
  { text: "input: Escuche que en un informe de la Organización Internacional del Trabajo, el desempleo entre los que tienen título universitario es del 29,1%, mientras que entre los que no saben leer ni escribir es solo del 3,4%." },
  { text: "output: El desempleo entre los titulados universitarios es del 29,1%, frente al 3,4% de los que no saben leer ni escribir, según un informe de la Organización Internacional del Trabajo." },
  { text: "input: Probablemente recordemos \"Her\" como la película de ciencia ficción más acertada de nuestra generación.\n\nLos asistentes de inteligencia artificial personales (incluso íntimos), de contexto prolongado y siempre activos son una realidad." },
  { text: "output: La película 'Her' se destaca como una representación notable de ciencia ficción en nuestra generación.Los asistentes de inteligencia artificial, que pueden ser personales e íntimos, con un contexto prolongado y una disponibilidad constante, son una realidad palpable en la actualidad.Recientemente, Hume.ai ha logrado un avance significativo al completar una pieza fundamental en este rompecabezas tecnológico." },
  { text: "input: Muchos ven el ejercicio como una forma de quemar calorías o verse mejor en el espejo.\n\nY sirve para eso, por supuesto, pero también para mucho más.\n\nDe hecho, la mayor parte de sus beneficios no se pueden ver, solo se pueden sentir." },
  { text: "output: El ejercicio físico es comúnmente percibido como un medio para quemar calorías y mejorar la apariencia física.Sin embargo, su utilidad va más allá de estos aspectos superficiales.La mayoría de los beneficios del ejercicio no son visibles a simple vista, sino que se experimentan a nivel interno." },
  { text: "input: La economía se pegó un buen bajón en junio, fue la mayor caída del año con un 6,7% menos que en el mismo mes de 2017, así lo informó hoy el Indec. Aparte del efecto de la sequía, la economía también recibió un golpe por la devaluación fuerte, que afectó a la industria y a los negocios grandes y chicos." },
  { text: "output: La actividad económica tuvo su mayor caída del año en junio, con una contracción de 6,7% con respecto al mismo mes de 2017, según informó hoy el Indec. Además de los efectos de la sequía, la actividad estuvo golpeada por la brusca devaluación, que impactó en la industria manufacturera y en los comercios mayoristas y minoristas." },
  { text: "input: Ah, querida Andrée, qué difícil oponerse, aun aceptándolo con entera sumisión del propio ser, al orden minucioso que una mujer instaura en su liviana residencia. Cuán culpable tomar una tacita de metal y ponerla al otro extremo de la mesa, ponerla allí simplemente porque uno ha traído sus diccionarios ingleses y es de este lado, al alcance de la mano, donde habrán de estar. Mover esa tacita vale por un horrible rojo inesperado en medio de una modulación de Ozenfant, como si de golpe las cuerdas de todos los contrabajos se rompieran al mismo tiempo con el mismo espantoso chicotazo en el instante más callado de una sinfonía de Mozart" },
  { text: "output: Resulta desafiante oponerse al meticuloso orden que una mujer establece en su hogar, incluso cuando se acepta con total conformidad. Es difícil resistirse a la tentación de desplazar una simple tacita de metal hacia el otro extremo de la mesa, solo porque uno ha traído sus diccionarios ingleses y es más práctico tenerlos al alcance de la mano. Sin embargo, mover esa tacita puede provocar una perturbadora sensación, comparable a un repentino y desafortunado contraste visual en medio de una composición de Ozenfant. Es como si de pronto todas las cuerdas de los contrabajos se rompieran simultáneamente con un impactante chirrido en el momento más sereno de una sinfonía de Mozart." },
  { text: "input: El FMI publicó un informe que revela que la productividad total de los factores de Colombia ha caído y se ha estancado en las últimas tres décadas, la cual, junto con una mala asignación de recursos, afectó el crecimiento económico" },
  { text: "output: Un informe del Fondo Monetario Internacional (FMI) indica que la productividad total de los factores (PTF) en Colombia ha experimentado una disminución y estancamiento durante las últimas tres décadas. Esta situación, junto con una deficiente asignación de recursos, ha tenido un impacto negativo en el crecimiento económico del país." }

];

export const generateParts = (
  tone: TONE_DOCS,
  text: string,
  userInstructions: string
) => {
  const commonParts = [
    { text: `input: ${text}` },
    ...(userInstructions
      ? [
        { text: `input: User instructions to generate the text: [${userInstructions}]` },
        { text: "output: " }
      ] : [
        { text: "output: " }
      ])
  ];

  if (tone === TONE_DOCS.FORMAL) {
    return [
      ...formalParts,
      ...commonParts
    ];
  }

  if (tone === TONE_DOCS.CASUAL) {
    return [
      ...informalParts,
      ...commonParts
    ];
  }

  if (tone === TONE_DOCS.OBJETIVE) {
    return [
      ...objetiveParts,
      ...commonParts
    ];
  }
};

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image: any = formData.getAll("image");

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5" });
    const generationConfig = {
      temperature: 0.35,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096
    };

    const file = image[0];

    const fileContent = await file.arrayBuffer();
    const buffer = Buffer.from(fileContent);

    const parts = [
      { text: "Accurately describe each part of the image. Pay attention to details such as titles, instructions or labels, fields and their types, buttons, and other aspects of a form.  The text should have a professional tone. Change the words to use formal, informative and respectful language. Always use the third person for the description." },
      { text: "input: " },
      {
        inlineData: {
          mimeType: "image/png",
          data: Buffer.from(readFileSync(path.resolve(process.cwd(), 'public', 'examples', 'image4.png'))).toString("base64")
        }
      },
      { text: "output: En la ilustración, se muestra que la opción “Pages” en el sidebar de WordPress está seleccionada. Además, se observa la vista denominada “Pages”, la cual contiene una lista de páginas creadas con los siguientes nombres:“Agency Pages”“Contact Pages”“Home Page”“Work Pages”En la parte superior, se encuentran las opciones de filtrado habilitadas y un campo de búsqueda para filtrar por nombre. Junto al título de la vista “Pages”, aparece el botón “Add New” para crear una nueva página." },
      { text: "input: " },
      {
        inlineData: {
          mimeType: "image/png",
          data: Buffer.from(readFileSync(path.resolve(process.cwd(), 'public', 'examples', 'image5.png'))).toString("base64")
        }
      },
      { text: "output: En la imagen suministrada, se visualiza una vista de inicio de sesión de WordPress. Esta vista contiene los siguientes elementos:Campos de Inicio de Sesión:“Username or Email Address”: Permite al usuario ingresar su nombre de usuario o dirección de correo electrónico.“Password”: Aquí se ingresa la contraseña asociada a la cuenta.Opción de Recordar la Cuenta:Existe una casilla para que el usuario pueda seleccionar si desea que su cuenta permanezca recordada en el dispositivo.Botón de Inicio de Sesión:Un botón azul con la etiqueta “Login” permite al usuario iniciar sesión en su cuenta.Opciones Adicionales:En la parte inferior, se encuentran las opciones “Lost your password?”, que permite recuperar la contraseña en caso de olvido." },
      { text: "input: " },
      {
        inlineData: {
          mimeType: "image/png",
          data: Buffer.from(readFileSync(path.resolve(process.cwd(), 'public', 'examples', 'image0.png'))).toString("base64")
        }
      },
      { text: "output: En la imagen se ilustra el editor de WordPress, donde aparece una sección llamada “Content of Agency Page”. A su vez, esta sección contiene un sidebar con otras opciones, como “Main Information Section”, “Agency Stats Section”, “Client Relationship Section”, “The People Section” y “Client Section”.Dentro de la sección, se pueden ver los campos para añadir información, tales como:“Show Banner”: un interruptor para activar o desactivar.“Title”: para ingresar un texto.“Title (Mobile Version)”: para registrar un título en la versión móvil.“Type of Video”: que muestra varias opciones de tipo de video.“Upload a Desktop Video Link”: un campo de tipo enlace para agregar un enlace de video de escritorio.“Upload a Mobile Video Link”: un campo de tipo enlace donde se puede añadir un enlace de video para dispositivos móviles.En la parte superior, se visualiza el botón “Update” para actualizar el campo." },
      { text: "input: " },
      {
        inlineData: {
          mimeType: "image/png",
          data: Buffer.from(readFileSync(path.resolve(process.cwd(), 'public', 'examples', 'image2.png'))).toString("base64")
        }
      },
      { text: "output: En la ilustración, se presenta un formulario denominado “Contact Emails” con tres bloques de campos. Cada bloque contiene dos campos: “Title” y “Email”. Al final del formulario, se encuentra un botón azul con la etiqueta “Add Email”, que permite añadir un nuevo bloque con los mismos dos campos." },
      { text: "input: " },
      {
        inlineData: {
          mimeType: "image/png",
          data: Buffer.from(readFileSync(path.resolve(process.cwd(), 'public', 'examples', 'image3.png'))).toString("base64")
        }
      },
      { text: "output: En la imagen, se observa que la opción “Header” con un símbolo de tuerca en el sidebar de WordPress está seleccionada. La vista denominada “Header” contiene un formulario llamado “Social Media in Header”.Este formulario presenta dos campos agrupados por bloques:Bloque de Icono:Campo “Icon”: Este campo es de tipo texto y se utiliza para ingresar el nombre de la red social que representará el ícono visualmente. Para conocer los nombres de los íconos de marcas disponibles, puedes visitar este enlace.Campo “Link”: Es un campo de tipo enlace donde se puede ingresar la URL correspondiente a la red social.Botones:En la parte inferior, se encuentra un botón azul con la etiqueta “Add Social Media”, que permite añadir un nuevo bloque con los campos descritos anteriormente.En la parte superior derecha, se encuentra otro botón azul con la etiqueta “Update”, que se utiliza para actualizar la información." },
      { text: "input: " },
      {
        inlineData: {
          mimeType: "image/png",
          data: Buffer.from(readFileSync(path.resolve(process.cwd(), 'public', 'examples', 'image1.png'))).toString("base64")
        }
      },
      { text: "output: En la imagen se observa que la opción “Media” en el sidebar de WordPress está seleccionada. Además, se visualiza el editor multimedia de WordPress, donde se muestran las imágenes subidas al sistema de gestión de contenidos (CMS). En la parte superior, se presentan las siguientes opciones:Filtrado: Permite filtrar las imágenes según criterios específicos.Visualización: Se puede elegir entre ver los elementos en formato de lista o en bloques. Búsqueda: Hay un campo de búsqueda para buscar entre todos los elementos.Justo al lado del título “Media Library”, se encuentra un botón “Add New” para añadir una nueva imagen al CMS." },
      { text: "input: Describe this image" },
      {
        inlineData: {
          mimeType: file.type,
          data: buffer.toString("base64")
        }
      },
      { text: "output: " }
    ];

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts
        }
      ],
      generationConfig
    });

    const response = result.response;
    console.log(response.text());

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
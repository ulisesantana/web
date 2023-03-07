---
title: "Gitmoji: una forma más visual de commitear"
date: 2021-09-25
description: Gitmoji es una guía de emojis para los mensajes de los commits que permite ver la historia de un proyecto git de una manera muy visual.
tags: [software,git,workflow]
images: [gitmoji.png,gitmoji-cli.gif,gitlog.png]
cover: ./cover.png
draft: false
---

La idea detrás de [gitmoji](https://gitmoji.dev) es muy simple: usar emojis en los mensajes de commit proporcionando una manera fácil de identificar el propósito o la intención de un commit con sólo mirar los emojis utilizados.

 Sin embargo, al haber tantísimos emojis lo que para una persona significa una cosa, para otra puede significar otra. [Carlos Cuesta](https://carloscuesta.me) se dió cuenta de esto y decidió crear [gitmoji](https://gitmoji.dev): una guía de emojis para mensajes de commit.

<img-caption src="/assets/blog/2021/gitmoji/gitmoji.png" alt="Captura de pantalla del buscador de la web de gitmoj">
  En la web de gitmoji podemos buscar que emoji necesitamos en base a la intención de nuestro commit.
</img-caption>

Además de la web en la que puedes ver los emojis y sus significados de cara a la intención del commit también hay [otras herramientas con la filosofía gitmoji](https://gitmoji.dev/related-tools) como [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli):

<img-caption src="/assets/blog/2021/gitmoji/gitmoji-cli.gif" alt="Ejemplo de uso de gitmoji-cli">
  gitmoji-cli nos permite usar gitmoji sin salir de la terminal.
</img-caption>

[gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) es una herramienta interactiva de terminal que nos permite escribir nuestros commits de una manera más cómoda y dándonos a elegir el emoji que vamos a usar. Todos esto sin necesidad de usar un navegador o un selector de emojis.

A priori todo esto de los gitmojis puede sonar simplón o que no aporta valor, pero una vez puesto en práctica ayuda mucho a encontrar commits en los que se hacen *bug fixes*, se añade o elimina una dependencia, por ejemplo.

<img-caption src="/assets/blog/2021/gitmoji/gitlog.png" alt="Log de git con commits precedidos de un emoji">
  El log de git puede ser muy visual y autoexplicativo gracias a gitmoji.
</img-caption>

Yo uso [gitmoji](https://gitmoji.dev) en todos los proyectos en los que me dejan desde que lo descubrí hará unos 2 años. Para mí su mayor ventaja es que al final añade información al mensaje del commit que de otra manera sería más difícil de transmitir. **El mensaje del commit te dice qué es lo que se ha hecho, pero el emoji te da contexto de una manera muy rápida.** En cuanto a su [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli), lo probé en su momento, pero como al final casi siempre commiteo desde JetBrains pues al final prefería tener algo como Emote en Linux o usar el selector de emojis en macOS (para abrirlo pulsa Ctrl + Command + Espacio) para copiar el emoji y commitear con mi IDE.

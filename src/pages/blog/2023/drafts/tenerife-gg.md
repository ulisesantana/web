---
title: Tenerife GG
date: 2022-07-20
description: El 14 de Julio di una charla en Tenerife GG
tags: [evento,software]
cover: ../../preview.png
draft: true
---


1. Nerea y la IA que va a fuego. Me dio tips y recursos para comenzar con IA
    - Existen IA que completan tablillas rotas en lenguas muertas. (Ejemplo de Griego Antiguo)
    - Hablando con ella comentó la movida de que hay un artista que ha creado una representación visual de las redes neuronales, creo que es [Javier Ideami](https://ideami.com). Es una fantasía de persona. Chiquito puntal. 
1. Alstair Cockburn y su síntesis del agile
    - La charla la dió en español puesto que pasó tiempo en Buenos Aires
    - Desde el público le preguntaron por algún recuerdo memorable y respondió que le asombró como las personas que firmaron el manifiesto ágil dejaron a un lado sus grandes egos de hombre blanco. Dejaron a un lado cualquier enemistad y trabajaron juntos. Recomendó no hacer sólo escucha activa con la gente con la que trabajas, sino escucharlos como si fueran genios.
1. Carlos Blé y lo que implica hacer un código sostenible
    - Principio de Mínima sorpresa
    - Cohesión / Acoplamiento
1. Adrián Ferrera y la arquitectura en frontend
    - La estructura de directorios no es arquitectura. La arquitectura es cómo los artefactos de nuestro dominio interactúan entre ellos.
    - Container & Componentes Representacionales
    - Separar caché del estado. La gestión del estado.
    - [Repo de ejemplo usado en la charla](https://github.com/adrian-afergon/hexagonal-arch-example/tree/feat/add-next-example)
    - Habla de cómo mantenernos aislados de la estructura de la API de terceros teniendo objetos de dominio y mappers. De esta manera hay que cambiarlo en un solo sitio, en vez de tener que cambiarlo por todo nuestro código.
    - Recursos:
        - Arquitectura de software Ornitorrinco y cómo no perder foco en negocio. | Aleix Morgadas - YouTube
        - Building Evolutionary Architectures: Support Constant Change : Ford, Neal, Parsons, Rebecca, Kua, Patrick: Amazon.es: Libros
        - Código sostenible (codigosostenible.com)
        - Clean Architecture: A Craftsman's Guide to Software Structure and Design: Martin, Robert C.
        - Arquitectura Hexagonal en el FrontEnd (2020) (softwarecrafters.io)
        - Devs Lives - YouTube
1. Paula Vidal y cómo aplicar Google Cloud al análisis de los agujeros negros (Agujero negro M87*)
    - Se usó la interferometría para poder tener una especie de telescopio global con el que poder sacar fotos a objetos como agujeros negros.
    - Event Horizont Telescope. Son 8 telescopios repartidos a lo largo de la Tierra.
    - Cada telescopio recogía 350 TB al día de datos. En discos duros de Helio. En total fueron 5 Petabytes de datos que había que analizar.
    - En total tardaron 2 años en procesarlo todo. Fue con Google Cloud.
    - Para sacar Sagitario A* en el Event Horizont Telescope añadieron 3 telescopios más, siendo un total de 11.
1. Daniel Candil (ex THQ Nordic) y cómo hacer que el entorno te hable (environmental storytelling)
    - ¿Qué hace un Director de Arte en un videojuego?
    - Art of the show (Disney 1955)
    - El Diseño Temático
    - 
1. Defining boundaries con Jorge Barroso.
    - Definición de boundary de Uncle Bob en Clean Architecture
    - Podemos traducirlo como frontera
    - En el libro de Evans sobre DDD hay otra definición también interesante.
    - Propuesta de Jorge:
        - Boundaries externos: esa capa de servicios que suelen tener pocas opciones. La más externa a nosotros.
        - Boundaries internos: como nuestras propias capas de software hablan entre ellas.
        - Boundaries de método (o de clase): las clases en sí mismas tienen sus métodos públicos y privados.
    - Jorge habla de que tenemos problemas de polisemia en la industria del software.
    - Todas las decisiones que tomamos en el software va de tratar de aplicar alta cohesión y bajo acoplamiento. Si haces algo que no cumpla esta regla, seguro que la estás liando.
    - Public Contracts: los contratos públicos son las puertas de entrada de los boundaries. Es la puerta de entrada de nuestras fronteras. 
        1. Hide implementations.
        1. Show expectations.
        1. Avoid 'Literals' on public External contracts. (Usa objetos de dominio en vez de literales)
        1. Interfaces, protocols, abstract classes... Are only implementation details.
    - Single Responsability Principle: Boundaries should help to split responsabilities.
    - Una de las cosas que tienen las boundaries es que ayudan mucho a poder testear.
    - Cuando el software escala, es el dominio lo que crece, dejando como accesorio todo lo que está alrededor (bases de datos, infraestructura y demás)
    - Boundaries are about Expectations. 
    - Cosas a buscar:
        - ¿Segregación de estado y comportamiento?
        - Principio de Segregación de Interfaces
        - Patrón Adaptador
        - CRC?

## Ciencia GG

1. Nerea Luis -> Inteligencia artificial: Colaboración para un mundo mejor.
    - Podríamos usar la inteligencia artificial para que el prediagnóstico sea mejor.
    - Poder generar diseños de branding con variaciones en cuestión de segundos.
    - Voz sintética para personas con discapacidad comunicativa. (Project Relate)
    - Waymo One: El primer servicio de taxi 100% autónomo.
    - Ver documental: Mi empleo mi futuro - Fundación COTEC
    - La transversalidad de la inteligencia artificial:
        1. Nivel técnico
        1. Nivel humano-máquina
        1. Nivel legal
        1. Nivel ético
        1. Nivel económico
        1. Nivel educativo
    - IA Lambda. Es la IA conversacional que se ha dicho que tiene consciencia. Eso es algo que realmente estamos muy lejos todavía.
1. Carlos Santana -> IA y Multimodalidad: Generando lenguaje, código y arte 
    - Tecnología transversal
        - Computer vision
            - BLIP: Bootstrapping Language-Image Pre-training.
            - Flamingo.
    - Desarrollo exponencial
        - Exponencial generativo
            - GAN (Redes generativas adversarias). (thispersondoesntexist.com)
            - Generación de imágenes.
                - Dall-e
                - Google Parti
    - Aprendizaje
        - GPT-3
        - BLOOM
        - Minerva
        - El colega se ha hecho un vídeo usando IA. Sólo ha tenido que narrarlo.
1. Conchi Lillo -> 
    - Lentillas inteligentes. Comenzó con Google, pero ahora quien ha tomado el relevo es Sensimed con Triggerfish.
    - Lentillas con realidad aumentada por Mojo.
    - Optogénetica: a base de un impulso lumínico se activan impulsos en neuronas. Hay un experimento que hace que un ratón coma cuando se le da el impulso.
    - Lillo Lab Research
1. La Hiperactina -> Dormir y otras cosas
    - El récord de horas sin dormir es 11 días (264 horas). Consecuencias:
        - Perdió la memoria a corto plazo.
        - Sus ojos no podían enfocar.
        - No reconocía objetos con el tacto.
        - No podía coordinar movimientos.

Cosas a mirar:
 - Computer vision
 - Deep learning

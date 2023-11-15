---
title: Como deshabilitar tu webcam en Linux
date: 2022-01-05
cover: /assets/es/blog/2022/deshabilita-tu-webcam/cover.png
description: En ocasiones es más cómodo deshabilitar la cámara del ordenador mediante software que físicamente. En este articulo te explico como hacerlo en Linux.
tags: [linux]
draft: true
---

En casi todos mis dispositivo tengo la cámara frontal tapada con la típica pegatina con ventana para poder bloquear la cámara físicamente. Sin embargo, en el sobremesa no puedo porque la ventana y la pegatina me tapan la lente de la cámara haciendo imposible que se me vea cuando quiero.

Cómo no podía tapar la cámara físicamente me planteé hacerlo por software. Después de buscar por internet me encontré que si ejecutas esto en terminal deshabilitas la cámara:

```shell
sudo modprobe -r uvcvideo
```

Ten en cuenta que si estás usando la cámara el comando dará un error. En cuanto cierres la aplicación que la esté usando podrás deshabilitarla sin problemas. Por otro lado, si quieres habilitarla tienes dos opciones: o reinicias el ordenador o puedes ejecutar este comando:

```shell
sudo modprobe uvcvideo
```

Y ya está, eso es todo lo que tienes que hacer para habilitar y deshabilitar tu cámara en Linux. Por último te dejo los alias que me creé en mi `.zshrc` para no tener que estar recordando los comandos:

```shell
alias enable-cam="sudo modprobe uvcvideo"
alias disable-cam="sudo modprobe -r uvcvideo"
```

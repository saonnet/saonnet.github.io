---
layout: post
title: JAVA OPTIONS V.S. JAVA TOOL OPTIONS
date: 2026-11-01 15:48 +0530
categories: [Software Engineering, Java]
tags: [java, core java, environment variables, xmx memory, xms memory]
author: Shivansh Anand
description: "Main difference between JAVA_OPTIONS and JAVA_TOOL_OPTIONS."
---

Both `_JAVA_OPTIONS` and `JAVA_TOOL_OPTIONS` allow us to configure jvm properties via environment variables instead of explicitly passing the settings as command line arguments. However, there are two important differences between them:

1. `_JAVA_OPTIONS` has the highest precedence. If you are providing a given configuration via `_JAVA_OPTIONS`, `JAVA_TOOL_OPTIONS` and also as a command line argument, then the value provided by _JAVA_OPTIONS will override the other two. For example, in the below code snippet, jvm will set Xmx at 2048m and Xms at 1024m.

   ```shell
   export JAVA_TOOL_OPTIONS="-Xmx1024m -Xms512m"
   export _JAVA_OPTIONS="-Xmx2048m -Xms1024m"
   java -jar some_program.jar -Xmx4096m -Xms2048m
   ```

   On the other hand, JAVA_TOOL_OPTIONS has lowest precedence among the three. So if same configuration is provided via JAVA_TOOL_OPTIONS and any other of the above provided methods, then the configuration set using JAVA_TOOL_OPTIONS will be overridden.

2. `JAVA_TOOL_OPTIONS` is a standard setting which is applicable to all JDK variants, be it Oracle JDK, Microsoft JDK, OpenJDK or any other JDK. Whereas exact identifier used for _JAVA_OPTIONS differs based on JDK being used. e.g. _JAVA_OPTIONS is used with Oracle JDKs, for IBM JDKs we'll have to use IBM_JAVA_OPTIONS. Note that, most of the modern JDK's have support JDK_JAVA_OPTIONS -- which is the standard version of _JAVA_OPTIONS.

Also note that many secondary systems like Docker, Apache Tomcat etc. use `JAVA_OPTS` for `_JAVA_OPTIONS` and `JAVA_TOOL_OPTS` for `JAVA_TOOL_OPTIONS`.

#### References
- [Difference between _JAVA_OPTIONS, JAVA_TOOL_OPTIONS and JAVA_OPTS](https://stackoverflow.com/questions/28327620/difference-between-java-options-java-tool-options-and-java-opts)
- [JAVA - _JAVA_OPTIONS and JAVA_TOOL_OPTIONS environment variable](https://thompsonng.blogspot.com/2016/08/java-javaoptions-and-javatooloptions.html)
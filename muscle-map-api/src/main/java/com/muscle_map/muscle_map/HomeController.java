package com.muscle_map.muscle_map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(path="/")
    public String index(){
        return "index.html";
    }
}

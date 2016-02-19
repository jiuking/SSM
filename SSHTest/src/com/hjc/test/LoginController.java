package com.hjc.test;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

	@RequestMapping(value="/index")
	public ModelAndView toHome()throws Exception{
		ModelAndView mv = new ModelAndView();
		System.out.println("hello world");
		mv.setViewName("jsp/MyJsp");
		return mv;
		//◊¢ Õ≤‚ ‘
	}
}

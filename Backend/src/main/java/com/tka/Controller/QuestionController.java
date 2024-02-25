package com.tka.Controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tka.entity.Answer;
import com.tka.entity.Question;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class QuestionController 
{
	@Autowired
	SessionFactory factory;


	@GetMapping("getFirstQuestion/{subjectFromAngular}")
	public Question getFirstQuestion(@PathVariable String subjectFromAngular)
	{
		HttpSession httpSession=LoginController.httpsession;
		
		Session session=factory.openSession();
				
		Query query=session.createQuery("from Question where subject=:subjectName");
		
		query.setParameter("subjectName",subjectFromAngular);
		
		List<Question> list=query.list();
		
		httpSession.setAttribute("allquestions",list);
				
		Question question=list.get(0);
				
		return question;
			
	}
	
	// {"username":"x","password":"y"}
	// 0   1   2
		
	@RequestMapping("nextQuestion")
	public Question nextQuestion()
	{
		
		HttpSession httpSession=LoginController.httpsession;
		
		List<Question> listofquestions=(List<Question>) httpSession.getAttribute("allquestions");
		
		Question question=null;
		
		
		if((int)httpSession.getAttribute("questionIndex")<listofquestions.size()-1)// 2
		{
			httpSession.setAttribute("questionIndex",(int)httpSession.getAttribute("questionIndex") + 1);// increase index
		
		
		//  listofquestions==> 	[ (Question object),(Question object),(Question object)]List object
		
		//                       	0               			1              2
		
		 question=listofquestions.get((int)httpSession.getAttribute("questionIndex"));// read object from list
		
	
		}
		else
		{
			
			httpSession.setAttribute("questionIndex",0);// show first question
			
			question=listofquestions.get((int)httpSession.getAttribute("questionIndex"));// read object from list
				 
			 
		}
		
		return question;
		
				
	}
	
	
	
		// 0   1   2
	
		@RequestMapping("previousQuestion")
		public Question previousQuestion()
		{
			
			HttpSession httpSession=LoginController.httpsession;
			
			List<Question> listofquestions=(List<Question>) httpSession.getAttribute("allquestions");
			
			Question question=null;
			
			
			if((int)httpSession.getAttribute("questionIndex")>0)
			{
				httpSession.setAttribute("questionIndex",(int)httpSession.getAttribute("questionIndex") - 1);
			
			
			//  listofquestions==> 	[ (Question object),(Question object),(Question object)]List object
			
			//                       	0               			1              2
			
			 question=listofquestions.get((int)httpSession.getAttribute("questionIndex"));// read object from list
			
		
			}
			else
			{
				
				
				httpSession.setAttribute("questionIndex",listofquestions.size()-1);// show last question
				
				question=listofquestions.get((int)httpSession.getAttribute("questionIndex"));// read object from list
					 
				 
			}
			
			return question;
			
					
		}
		
		
	
	// {"qno":1 ,"qtext":"what","submittedAnswer":"A","correctAnswer":"B"}
	
		@PostMapping("saveAnswer")
		public void saveAnswer(@RequestBody Answer answer)
		{

			HttpSession httpSession=LoginController.httpsession;
			
			HashMap<Integer,Answer> hashmap=(HashMap<Integer, Answer>) httpSession.getAttribute("submittedDetails");
			
			hashmap.put(answer.getQno(),answer);
			
			System.out.println(hashmap);
			
		}
	
		
		@RequestMapping("calculateScore")
		
		public Integer calculateScore()
		{
			HttpSession httpSession=LoginController.httpsession;
			
			HashMap<Integer,Answer> hashmap=(HashMap<Integer, Answer>) httpSession.getAttribute("submittedDetails");
			
			
			Collection<Answer> collection=hashmap.values();

			
			for (Answer answer : collection) 
			{
						if(answer.getSubmittedAnswer().equals(answer.getCorrectAnswer()))
						{

							httpSession.setAttribute("score",(int)httpSession.getAttribute("score")+1);
							
						}
			}
			
			
			
			return (int)httpSession.getAttribute("score");
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
	
	
	
	
	
	
	
	
}

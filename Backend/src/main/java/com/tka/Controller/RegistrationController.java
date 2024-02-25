package com.tka.Controller;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tka.entity.User;

@RestController
@CrossOrigin("http://localhost:4200")
public class RegistrationController 
{
		@Autowired
		SessionFactory factory;
	
		@PostMapping("saveToDB")
		public void saveToDB(@RequestBody User user)
		{
			System.out.println(user);
			
			Session session=factory.openSession();
			
			Transaction tx=session.beginTransaction();
				
					session.persist(user);
			
			tx.commit();
			
		}

		@GetMapping("getUser/{username}")
		public User getUser(@PathVariable String username)
		{
			Session session=factory.openSession();
			
			Transaction tx=session.beginTransaction();
				
					User user=session.get(User.class,username);
			
			tx.commit();
			
			System.out.println(user);
			
			return user; // Spring will convert java object into JSON String
			
		}
		
		
		
		@DeleteMapping("deleteUser/{username}")
		public ResponseEntity<Boolean> deleteUser(@PathVariable String username)
		{
			try
			{
				Session session=factory.openSession();
			
				Transaction tx=session.beginTransaction();
				
					User user=session.get(User.class,username);
					
					session.delete(user);
			
				tx.commit();
			
					System.out.println(user);
			
					ResponseEntity<Boolean> responseEntity=new ResponseEntity<Boolean>(true,HttpStatus.OK);
			
					return responseEntity; // Spring will convert java object into JSON String
			}
			
			catch(Exception e)
			{
				
				ResponseEntity<Boolean> responseEntity=new ResponseEntity<Boolean>(false,HttpStatus.OK);
				
				return responseEntity; // Spring will convert java object into JSON String
			}
			
		}
				
		
		@GetMapping("getAllUsers")
		public List<User> getAllUsers()
		{
			Session session=factory.openSession();
			
			return session.createQuery("from User").list();
			
		}
}







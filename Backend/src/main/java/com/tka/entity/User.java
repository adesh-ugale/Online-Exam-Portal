package com.tka.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User 
{
	@Id
	String username;
	String password;
	long mobno; // setMobileno()
	String emailid;
	
	// int myAge;
	
	// my_age  ==> column must be present in database table or else unknown column exception will occur
	

	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmailid() {
		return emailid;
	}
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", mobno=" + mobno + ", emailid=" + emailid
				+ "]";
	}
	public long getMobno() {
		return mobno;
	}
	public void setMobno(long mobno) {
		this.mobno = mobno;
	}
	
	
	
	// public boolean equals(Object obj)
	
	// userfrombrowser.equals(userfromdatabase);
	
	@Override
	public boolean equals(Object secondobject) 
	{
		System.out.println("equals from User class");
		
		User user=(User)secondobject;
		
		if(this.username.equals(user.username) && this.password.equals(user.password))
			
			return true;
		else
			return false;
	}
	

	
	
	
	
}

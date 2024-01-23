package com.manageformation.controllers;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.manageformation.dto.AuthRequest;
import com.manageformation.entities.Formater;
import com.manageformation.entities.UserInfo;
import com.manageformation.services.JwtService;
import com.manageformation.services.UsersService;



@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService service;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsersService userService;
    

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/new")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }
    
    @PostMapping("/newFormaterInterne")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewFormaterInterne(@RequestBody Formater formater) {
        return service.addFormaterInterne(formater);
    }
    
    @PostMapping("/newFormaterExterne")
    public String addNewFormaterExterne(@RequestBody Formater formater) {
        return service.addFormaterExterne(formater);
    }
/*
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Product> getAllTheProducts() {
        return service.getProducts();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public Product getProductById(@PathVariable int id) {
        return service.getProduct(id);
    }
    */

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            String role = userService.findRoleByEmail(authRequest.getEmail());
            String token = jwtService.generateToken(authRequest.getEmail());

            // Build JSON response as a Map
            Map<String, Object> jsonResponse = new HashMap<>();
            jsonResponse.put("token", token);
            jsonResponse.put("role", role);

            return ResponseEntity.ok(jsonResponse);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
    
    @PostMapping("/newAssistant")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewAssitant(@RequestBody UserInfo userInfo) {
        return service.addAssistance(userInfo);
    }
    @PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public String UpdateFormater(@RequestBody Formater formater) {
    	return service.updateFormater(formater);
    }
    
    @DeleteMapping("deleteFormater")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public void DeleteFormater(@RequestBody Formater formater) {
    	service.DeleteFormater(formater);
    }
    
   
}

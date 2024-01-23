package com.manageformation.controllers;


import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin("*")
public class UsersController {

    @Autowired
    private UsersService service;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

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
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
    
    @PostMapping("/newAssistant")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewAssitant(@RequestBody UserInfo userInfo) {
        return service.addAssistance(userInfo);
    }
    
}

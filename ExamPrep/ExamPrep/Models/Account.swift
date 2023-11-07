//
//  Account.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/4/23.
//

import Foundation
import Observation

enum LoginError: Error {
    case loginFailed
    case keychainError
}

@Observable
class Account {
    
    private var httpClient: HTTPClient
    var isLoggedIn: Bool = false

    init(httpClient: HTTPClient) {
        self.httpClient = httpClient
    }
    
    func register(email: String, password: String) async throws -> RegistrationResponse {
        
        let params = [JSON.Keys.email: email, JSON.Keys.password: password]
        let body = try JSONEncoder().encode(params)
        
        let resource = Resource(url: API.endpointURL(for: .register), method: .post(body), modelType: RegistrationResponse.self)
        let response = try await httpClient.load(resource)
        return response
    }
    
    func login(email: String, password: String) async throws {
        
        let params = [JSON.Keys.email: email, JSON.Keys.password: password]
        let body = try JSONEncoder().encode(params)
        
        let resource = Resource(url: API.endpointURL(for: .login), method: .post(body), modelType: LoginResponse.self)
        let response = try await httpClient.load(resource)
        
        // Check if the login was successful
        guard response.success, let token = response.token else {
            throw LoginError.loginFailed
        }
        
        // Store the JWT token in the Keychain
        guard Keychain.set(token, forKey: "jwttoken") else {
            throw LoginError.keychainError
        }
        
        isLoggedIn = true
    }
    
}

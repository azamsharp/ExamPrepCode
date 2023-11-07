//
//  ContentView.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/3/23.
//

import SwiftUI

struct ContentView: View {
    
    @Environment(Account.self) private var account
    
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var registering: Bool = false
    
    @State private var message: String = ""
    
    private func register() async {
        do {
            let response = try await account.register(email: email, password: password)
            if response.success {
                // navigate to the login screen
            } else {
                message = response.message ?? ""
            }
        } catch {
            message = error.localizedDescription 
        }
    }
    
    var body: some View {
        Form {
            TextField("Email", text: $email)
            TextField("Password", text: $password)
            Button("Register") {
                registering = true
            }.task(id: registering) {
                if registering {
                    await register()
                    registering = false
                }
            }
        }
        .navigationTitle("Registration")
    }
}

#Preview {
    NavigationStack {
        ContentView()
            .environment(Account(httpClient: HTTPClient.shared))
    }
}

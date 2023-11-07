//
//  LoginScreen.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/7/23.
//

import SwiftUI

struct LoginScreen: View {
    
    @Environment(Account.self) private var account
    
    @State private var email: String = ""
    @State private var password: String = ""
    
    @State private var authenticating: Bool = false
    
    private func login() async {
        do {
            try await account.login(email: email, password: password)
        } catch {
            print(error)
        }
    }
    
    var body: some View {
        Form {
            TextField("Email", text: $email)
                .textInputAutocapitalization(.never)
            SecureField("Password", text: $password)
            Button("Login") {
                authenticating = true
            }.task(id: authenticating) {
                if authenticating {
                    await login()
                    authenticating = false
                }
            }
        }.navigationTitle("Login")
    }
}

#Preview {
    NavigationStack {
        LoginScreen()
            .environment(Account(httpClient: HTTPClient.shared))
    }
}

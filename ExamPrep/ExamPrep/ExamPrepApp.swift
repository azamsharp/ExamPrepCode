//
//  ExamPrepApp.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/3/23.
//

import SwiftUI

@main
struct ExamPrepApp: App {
    
    @State private var account = Account(httpClient: HTTPClient.shared)
    
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                ContentView()
                    .environment(account)
            }
        }
    }
}

//
//  DashboardScreen.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/8/23.
//

import SwiftUI

struct DashboardScreen: View {
    
    @Environment(Faculty.self) private var faculty
    
    var body: some View {
        VStack {
            Text("Dashboard")
        }.task {
            do {
                try await faculty.loadCourses()
            } catch NetworkError.unauthorized {
                // navigate(.login)
            } catch {
                print(error.localizedDescription)
            }
        }
    }
}

#Preview {
    DashboardScreen()
        .environment(Faculty(httpClient: HTTPClient.shared))
}

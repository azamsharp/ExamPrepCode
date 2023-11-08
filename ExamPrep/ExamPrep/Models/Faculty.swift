//
//  Student.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/8/23.
//

import Foundation
import Observation

@Observable
class Faculty {
    
    private var httpClient: HTTPClient
    var courses: [Course] = []
    
    init(httpClient: HTTPClient) {
        self.httpClient = httpClient
    }
    
    func loadCourses() async throws {
        
        let resource = Resource(url: API.endpointURL(for: .faculty(.courses)), modelType: [Course].self)
        courses = try await httpClient.load(resource)
    }
    
}

//
//  Constants.swift
//  ExamPrepClient
//
//  Created by Mohammad Azam on 9/15/23.
//

import Foundation

struct MessageConstants {
    static let unableToProcessRequest = "We're sorry, but we couldn't complete your request at this time. Please try again later."
    static let invalidCredentials = "Email or password is incorrect. Please try again."
}

struct JSON {
    struct Keys {
        static let email = "email"
        static let password = "password"
    }
}

struct API {
    
    static let baseURL = "http://localhost:8080"
    
    enum APIEndpoint {
        
        enum Faculty {
            case courses
            case grades
            case exams
        }
        
        enum Student {
            case enroll
        }
        
        case register
        case login
        case roles
        case availableCourses
        case faculty(Faculty)
        case student(Student)
        
        var path: String {
            switch self {
                case .register:
                    return "/api/register"
                case .login:
                    return "/api/login"
                case .roles:
                    return "/api/roles"
                case .availableCourses:
                    return "/api/courses"
                case .faculty(let faculty):
                    switch faculty {
                        case .courses:
                            return "/api/faculty/courses"
                        case .grades:
                            return "/api/faculty/grades"
                        case .exams:
                            return "/api/faculty/exams"
                    }
                case .student(let student):
                    switch student {
                        case .enroll:
                            return "/api/students/courses/enroll"
                    }
              
            }
        }
    }
    
    static func endpointURL(for endpoint: APIEndpoint) -> URL {
        let endpointPath = endpoint.path
        return URL(string: baseURL + endpointPath)!
    }
    
}

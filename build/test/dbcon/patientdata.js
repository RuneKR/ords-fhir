"use strict";
exports.data = [
    {
        "id": "example",
        "text": {
            "status": "generated",
            "div": "<div>\n      \n      <table>\n        \n        <tbody>\n          \n          <tr>\n            \n            <td>Name</td>\n            \n            <td>Peter James \n              <b>Chalmers</b> (&quot;Jim&quot;)\n            </td>\n          \n          </tr>\n          \n          <tr>\n            \n            <td>Address</td>\n            \n            <td>534 Erewhon, Pleasantville, Vic, 3999</td>\n          \n          </tr>\n          \n          <tr>\n            \n            <td>Contacts</td>\n            \n            <td>Home: unknown. Work: (03) 5555 6473</td>\n          \n          </tr>\n          \n          <tr>\n            \n            <td>Id</td>\n            \n            <td>MRN: 12345 (Acme Healthcare)</td>\n          \n          </tr>\n        \n        </tbody>\n      \n      </table>    \n    \n    </div>"
        },
        "identifier": [
            {
                "fhir_comments": [
                    "   MRN assigned by ACME healthcare on 6-May 2001   "
                ],
                "use": "usual",
                "type": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/v2/0203",
                            "code": "MR"
                        }
                    ]
                },
                "system": "urn:oid:1.2.36.146.595.217.0.1",
                "value": "12345",
                "period": {
                    "start": "2001-05-06"
                },
                "assigner": {
                    "display": "Acme Healthcare"
                }
            }
        ],
        "active": true,
        "name": [
            {
                "fhir_comments": [
                    "   Peter James Chalmers, but called \"Jim\"   "
                ],
                "use": "official",
                "family": [
                    "Chalmers"
                ],
                "given": [
                    "Peter",
                    "James"
                ]
            },
            {
                "use": "usual",
                "given": [
                    "Jim"
                ]
            }
        ],
        "telecom": [
            {
                "fhir_comments": [
                    "   home communication details aren't known   "
                ],
                "use": "home"
            },
            {
                "system": "phone",
                "value": "(03) 5555 6473",
                "use": "work"
            }
        ],
        "gender": "male",
        "_gender": {
            "fhir_comments": [
                "   use FHIR code system for male / female   "
            ]
        },
        "birthDate": "1974-12-25",
        "_birthDate": {
            "extension": [
                {
                    "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
                    "valueDateTime": "1974-12-25T14:35:45-05:00"
                }
            ]
        },
        "deceasedBoolean": false,
        "address": [
            {
                "use": "home",
                "type": "both",
                "line": [
                    "534 Erewhon St"
                ],
                "city": "PleasantVille",
                "district": "Rainbow",
                "state": "Vic",
                "postalCode": "3999",
                "period": {
                    "start": "1974-12-25"
                }
            }
        ],
        "contact": [
            {
                "relationship": [
                    {
                        "coding": [
                            {
                                "system": "http://hl7.org/fhir/patient-contact-relationship",
                                "code": "partner"
                            }
                        ]
                    }
                ],
                "name": {
                    "family": [
                        "du",
                        "Marché"
                    ],
                    "_family": [
                        {
                            "extension": [
                                {
                                    "fhir_comments": [
                                        "   the \"du\" part is a family name prefix (VV in iso 21090)   "
                                    ],
                                    "url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier",
                                    "valueCode": "VV"
                                }
                            ]
                        },
                        null
                    ],
                    "given": [
                        "Bénédicte"
                    ]
                },
                "telecom": [
                    {
                        "system": "phone",
                        "value": "+33 (237) 998327"
                    }
                ],
                "gender": "female",
                "period": {
                    "start": "2012",
                    "_start": {
                        "fhir_comments": [
                            "   The contact relationship started in 2012   "
                        ]
                    }
                }
            }
        ],
        "managingOrganization": {
            "reference": "Organization/1"
        }
    },
    {
        "id": "pat2",
        "text": {
            "status": "generated",
            "div": "<div>\n      \n      <p>Patient Donald D DUCK @ Acme Healthcare, Inc. MR = 123456</p>\n    \n    </div>"
        },
        "identifier": [
            {
                "use": "usual",
                "type": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/v2/0203",
                            "code": "MR"
                        }
                    ]
                },
                "system": "urn:oid:0.1.2.3.4.5.6.7",
                "value": "123456"
            }
        ],
        "active": true,
        "name": [
            {
                "use": "official",
                "family": [
                    "Donald"
                ],
                "given": [
                    "Duck",
                    "D"
                ]
            }
        ],
        "gender": "other",
        "_gender": {
            "extension": [
                {
                    "url": "http://example.org/Profile/administrative-status",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "http://hl7.org/fhir/v2/0001",
                                "code": "A",
                                "display": "Ambiguous"
                            }
                        ]
                    }
                }
            ]
        },
        "photo": [
            {
                "contentType": "image/gif",
                "data": "R0lGODlhEwARAPcAAAAAAAAA/+9aAO+1AP/WAP/eAP/eCP/eEP/eGP/nAP/nCP/nEP/nIf/nKf/nUv/nWv/vAP/vCP/vEP/vGP/vIf/vKf/vMf/vOf/vWv/vY//va//vjP/3c//3lP/3nP//tf//vf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAATABEAAAi+AAMIDDCgYMGBCBMSvMCQ4QCFCQcwDBGCA4cLDyEGECDxAoAQHjxwyKhQAMeGIUOSJJjRpIAGDS5wCDly4AALFlYOgHlBwwOSNydM0AmzwYGjBi8IHWoTgQYORg8QIGDAwAKhESI8HIDgwQaRDI1WXXAhK9MBBzZ8/XDxQoUFZC9IiCBh6wEHGz6IbNuwQoSpWxEgyLCXL8O/gAnylNlW6AUEBRIL7Og3KwQIiCXb9HsZQoIEUzUjNEiaNMKAAAA7"
            }
        ],
        "managingOrganization": {
            "reference": "Organization/1",
            "display": "ACME Healthcare, Inc"
        },
        "link": [
            {
                "other": {
                    "reference": "Patient/pat1"
                },
                "type": "seealso"
            }
        ]
    },
    {
        "id": "pat2",
        "text": {
            "status": "generated",
            "div": "<div>\n      \n      <p>Patient Donald D DUCK @ Acme Healthcare, Inc. MR = 123456</p>\n    \n    </div>"
        },
        "identifier": [
            {
                "use": "usual",
                "type": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/v2/0203",
                            "code": "MR"
                        }
                    ]
                },
                "system": "urn:oid:0.1.2.3.4.5.6.7",
                "value": "123456"
            }
        ],
        "active": true,
        "name": [
            {
                "use": "official",
                "family": [
                    "Donald"
                ],
                "given": [
                    "Duck",
                    "D"
                ]
            }
        ],
        "gender": "other",
        "_gender": {
            "extension": [
                {
                    "url": "http://example.org/Profile/administrative-status",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "http://hl7.org/fhir/v2/0001",
                                "code": "A",
                                "display": "Ambiguous"
                            }
                        ]
                    }
                }
            ]
        },
        "photo": [
            {
                "contentType": "image/gif",
                "data": "R0lGODlhEwARAPcAAAAAAAAA/+9aAO+1AP/WAP/eAP/eCP/eEP/eGP/nAP/nCP/nEP/nIf/nKf/nUv/nWv/vAP/vCP/vEP/vGP/vIf/vKf/vMf/vOf/vWv/vY//va//vjP/3c//3lP/3nP//tf//vf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAATABEAAAi+AAMIDDCgYMGBCBMSvMCQ4QCFCQcwDBGCA4cLDyEGECDxAoAQHjxwyKhQAMeGIUOSJJjRpIAGDS5wCDly4AALFlYOgHlBwwOSNydM0AmzwYGjBi8IHWoTgQYORg8QIGDAwAKhESI8HIDgwQaRDI1WXXAhK9MBBzZ8/XDxQoUFZC9IiCBh6wEHGz6IbNuwQoSpWxEgyLCXL8O/gAnylNlW6AUEBRIL7Og3KwQIiCXb9HsZQoIEUzUjNEiaNMKAAAA7"
            }
        ],
        "managingOrganization": {
            "reference": "Organization/1",
            "display": "ACME Healthcare, Inc"
        },
        "link": [
            {
                "other": {
                    "reference": "Patient/pat1"
                },
                "type": "seealso"
            }
        ]
    }
];
